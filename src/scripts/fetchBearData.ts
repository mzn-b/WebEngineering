export const fetchBearDataScript = (): void => {
  const baseUrl = "https://en.wikipedia.org/w/api.php";
  const title = "List_of_ursids";
  const INDEX_0 = 0;
  const INDEX_1 = 1;

  interface Bear {
    name: string;
    binomial: string;
    fileName: string;
    range: string;
  }

  interface ImageInfo {
    url: string;
    descriptionurl: string;
    descriptionshorturl: string;
  }

  interface WikiPage {
    ns: number;
    title: string;
    missing?: string;
    known?: string;
    imagerepository?: string;
    imageinfo?: ImageInfo[];
  }

  interface QueryResponse {
    continue?: Record<string, string>;
    query?: {
      normalized?: Array<{ from: string; to: string }>;
      pages?: Record<string, WikiPage>;
    };
  }

  interface ParseResponse {
    parse?: {
      wikitext?: { "*": string };
    };
  }

  const params: Record<string, string> = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: "3",
    format: "json",
    origin: "*",
  };

  async function fetchJson<T>(url: string): Promise<T> {
    const resp = await fetch(url);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- deliberate type casting from any
    return (await resp.json()) as unknown as T;
  }

  const fetchImageUrl = async (
    fileName: string,
  ): Promise<string | undefined> => {
    try {
      const imageParams = {
        action: "query",
        titles: `File:${fileName}`,
        prop: "imageinfo",
        iiprop: "url|descriptionurl|descriptionshorturl",
        format: "json",
        origin: "*",
      };

      const url = `${baseUrl}?${new URLSearchParams(imageParams)}`;
      const data = await fetchJson<QueryResponse>(url);

      if (data.query?.pages === undefined) return undefined;

      const pages = Object.values(data.query.pages);
      const firstPage = pages.find((p) => Boolean(p.imageinfo?.[INDEX_0]?.url));
      return firstPage?.imageinfo?.[INDEX_0]?.url;
    } catch {
      return undefined;
    }
  };

  const parseBears = (wikitext: string): Bear[] => {
    const speciesTables = wikitext.split("{{Species table/end}}");
    const bears: Bear[] = [];

    for (const table of speciesTables) {
      const rows = table.split("{{Species table/row");
      for (const row of rows) {
        const nameMatch = /\|name=\[\[(.*?)]]/.exec(row);
        const binomialMatch = /\|binomial=(.*?)\n/.exec(row);
        const imageMatch = /\|image=(.*?)\n/.exec(row);

        if (
          nameMatch !== null &&
          binomialMatch !== null &&
          imageMatch !== null
        ) {
          const fileName = imageMatch[INDEX_1].trim().replace(/^File:/i, "");
          bears.push({
            name: nameMatch[INDEX_1],
            binomial: binomialMatch[INDEX_1],
            fileName,
            range: "TODO extract correct range",
          });
        }
      }
    }

    return bears;
  };

  const renderBear = (
    container: Element | null,
    bear: Bear,
    imageUrl?: string,
  ): void => {
    const wrapper = document.createElement("div");
    wrapper.className = "bear";

    const IMG_WIDTH = 200;
    const img = document.createElement("img");
    img.alt = `Image of ${bear.name}`;
    img.width = IMG_WIDTH;
    img.src = imageUrl ?? "media/wild-bear.png";
    wrapper.appendChild(img);

    const nameP = document.createElement("p");
    const bearName = document.createElement("b");
    const { name } = bear;
    bearName.textContent = name;
    const bearBinomial = document.createElement("span");
    bearBinomial.textContent = ` (${bear.binomial})`;
    nameP.appendChild(bearName);
    nameP.appendChild(bearBinomial);
    wrapper.appendChild(nameP);

    const rangeP = document.createElement("p");
    rangeP.textContent = `Range: ${bear.range}`;
    wrapper.appendChild(rangeP);

    container?.appendChild(wrapper);
  };

  const fetchBearData = async (): Promise<void> => {
    try {
      const data = await fetchJson<ParseResponse>(
        `${baseUrl}?${new URLSearchParams(params)}`,
      );

      const bears = parseBears(data.parse?.wikitext?.["*"] ?? "");

      const container = document.querySelector("#bears");

      if (container !== null) {
        container.innerHTML = "";
      }

      for (const bear of bears) {
        const imageUrl = await fetchImageUrl(bear.fileName);
        renderBear(container, bear, imageUrl);
      }
    } catch {
      const errorDisplay = document.querySelector("#error-display");
      if (errorDisplay !== null)
        errorDisplay.textContent = "Failed to fetch more bear data.";
    }
  };

  void fetchBearData();
};
