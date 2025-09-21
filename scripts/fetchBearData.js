'use strict';

const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
};

const fetchImageUrl = async (fileName) => {
    try {
        const imageParams = {
            action: "query",
            titles: `File:${fileName}`,
            prop: "imageinfo",
            iiprop: "url",
            format: "json",
            origin: "*"
        };

        const url = `${baseUrl}?${new URLSearchParams(imageParams)}`;
        const resp = await fetch(url);
        const data = await resp.json();

        const pages = data?.query?.pages;
        const page = pages && Object.values(pages)[0];
        return page?.imageinfo?.[0]?.url;
    } catch {
        return undefined;
    }
}

const parseBears = (wikitext) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');
        for (const row of rows) {
            const nameMatch = row.match(/\|name=\[\[(.*?)]]/);
            const binomialMatch = row.match(/\|binomial=(.*?)\n/);
            const imageMatch = row.match(/\|image=(.*?)\n/);

            if (nameMatch && binomialMatch && imageMatch) {
                const fileName = imageMatch[1].trim().replace(/^File:/i, '');
                bears.push({
                    name: nameMatch[1],
                    binomial: binomialMatch[1],
                    fileName,
                    range: "TODO extract correct range"
                });
            }
        }
    }

    return bears;
}

const renderBear = (container, bear, imageUrl) => {
    const wrapper = document.createElement('div');
    wrapper.className = "bear";

    const img = document.createElement('img');
    img.alt = `Image of ${bear.name}`;
    img.width = 200;
    img.src = imageUrl ?? "media/wild-bear.png";
    wrapper.appendChild(img);

    const nameP = document.createElement('p');
    const bearName = document.createElement('b')
    bearName.textContent = bear.name
    const bearBinomial = document.createElement('span')
    bearBinomial.textContent = ` (${bear.binomial})`
    nameP.appendChild(bearName)
    nameP.appendChild(bearBinomial)
    wrapper.appendChild(nameP);

    const rangeP = document.createElement('p');
    rangeP.textContent = `Range: ${bear.range}`;
    wrapper.appendChild(rangeP);

    container.appendChild(wrapper);
}

const fetchBearData = async () => {
    try {
        const resp = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
        const data = await resp.json();
        const bears = parseBears(data?.parse?.wikitext['*'] || "");

        const container = document.querySelector('#bears');
        container.innerHTML = "";

        for (const bear of bears) {
            const imageUrl = await fetchImageUrl(bear.fileName);
            renderBear(container, bear, imageUrl);
        }
    } catch (err) {
        document.querySelector('#error-display').textContent = "Failed to fetch more bear data."
    }
}

void fetchBearData();
