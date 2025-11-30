import type { Bear } from "./BearData.tsx";

interface ImageInfo {
  url: string;
}

interface WikiPage {
  imageinfo?: ImageInfo[];
}

interface QueryResponse {
  query?: {
    pages?: Record<string, WikiPage>;
  };
}

interface ParseResponse {
  parse?: {
    wikitext?: { "*": string };
  };
}

const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const fetchJson = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url);
  return (await resp.json()) as T;
};

export const fetchImageUrl = async (
  fileName?: string,
): Promise<string | undefined> => {
  if (!fileName) return undefined;

  try {
    const imageParams = {
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*",
    };

    const url = `${baseUrl}?${new URLSearchParams(imageParams)}`;
    const data = await fetchJson<QueryResponse>(url);

    const pages = data.query?.pages;
    if (!pages) return undefined;

    const firstPage = Object.values(pages)[0];
    return firstPage?.imageinfo?.[0]?.url;
  } catch {
    return undefined;
  }
};

export const parseBears = (wikitext: string): Bear[] => {
  const speciesTables = wikitext.split("{{Species table/end}}");
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split("{{Species table/row");
    for (const row of rows) {
      const nameMatch = /\|name=\[\[(.*?)]]/.exec(row);
      const binomialMatch = /\|binomial=(.*?)\n/.exec(row);
      const imageMatch = /\|image=(.*?)\n/.exec(row);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace(/^File:/i, "");
        bears.push({
          name: nameMatch[1],
          binomial: binomialMatch[1],
          fileName,
          range: "TODO extract correct range",
        });
      }
    }
  }

  return bears;
};

export const fetchBearData = async (): Promise<Bear[]> => {
  const params: Record<string, string> = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: "3",
    format: "json",
    origin: "*",
  };

  const url = `${baseUrl}?${new URLSearchParams(params)}`;
  const data = await fetchJson<ParseResponse>(url);

  const wikitext = data.parse?.wikitext?.["*"] ?? "";
  return parseBears(wikitext);
};
