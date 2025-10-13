export const searchScript = (): void => {
  const form = document.querySelector(".search");
  const content = document.querySelector("#content");
  const MIN_LENGTH = 1;
  const UNEVEN = 1;
  const EVEN_CHECK = 2;

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { currentTarget } = e;
    if (!(currentTarget instanceof HTMLFormElement)) return;

    if (content === null) return;

    clearHighlights(content);

    const input = currentTarget.querySelector<HTMLInputElement>('[name="q"]');
    const searchKey = input?.value.trim();

    if (searchKey === undefined) return;

    highlight(content, searchKey);
  });

  const clearHighlights = (root: Element): void => {
    root.querySelectorAll(".highlight").forEach((el) => {
      const text = document.createTextNode(el.textContent);
      el.replaceWith(text);
    });
    root.normalize();
  };

  const getNodesToReplace = (walker: TreeWalker, regex: RegExp): Node[] => {
    const nodesToReplace: Node[] = [];

    while (walker.nextNode() !== null) {
      const { currentNode } = walker;
      if (currentNode.nodeValue !== null && regex.test(currentNode.nodeValue)) {
        nodesToReplace.push(currentNode);
      }
    }

    return nodesToReplace;
  };

  const highlight = (root: Element, searchKey: string): void => {
    const regex = new RegExp(
      `(${searchKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const { parentNode } = node;
        if (!(parentNode instanceof Element)) return NodeFilter.FILTER_REJECT;
        const { nodeName } = parentNode;
        if (["SCRIPT", "STYLE", "FORM"].includes(nodeName)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parentNode.classList.contains("highlight")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodesToReplace = getNodesToReplace(walker, regex);

    nodesToReplace.forEach((node) => {
      const parts = node.nodeValue?.split(regex);
      if (parts !== undefined && parts.length <= MIN_LENGTH) {
        return;
      }

      const fragment = document.createDocumentFragment();
      parts?.forEach((part, i) => {
        if (i % EVEN_CHECK === UNEVEN) {
          const mark = document.createElement("mark");
          mark.className = "highlight";
          mark.textContent = part;
          fragment.appendChild(mark);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });
      if (node instanceof Text) {
        node.replaceWith(fragment);
      }
    });
  };
};
