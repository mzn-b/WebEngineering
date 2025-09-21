'use strict'

const form = document.querySelector('.search');
const content = document.querySelector('#content')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    clearHighlights(content);

    const input = e.currentTarget.querySelector('[name="q"]');
    const searchKey = input.value.trim();
    if (!searchKey) return;

    highlight(content, searchKey);
});

const clearHighlights = (root) => {
    root.querySelectorAll('.highlight').forEach((el) => {
        const text = document.createTextNode(el.textContent);
        el.replaceWith(text);
    });
    root.normalize();
}

const getNodesToReplace = (walker, regex) => {
    const nodesToReplace = [];

    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (regex.test(node.nodeValue)) {
            nodesToReplace.push(node);
        }
    }

    return nodesToReplace;
}

const highlight = (root, searchKey) => {
    const regex = new RegExp(
        `(${searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
        'gi'
    );

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const parent = node.parentNode;
                if (!parent) return NodeFilter.FILTER_REJECT;
                const tag = parent.nodeName;
                if (['SCRIPT', 'STYLE', 'FORM'].includes(tag)) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (parent?.classList.contains('highlight')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const nodesToReplace = getNodesToReplace(walker, regex);

    nodesToReplace.forEach(node => {
        const parts = node.nodeValue.split(regex);
        if (parts.length <= 1) {
            return;
        }

        const fragment = document.createDocumentFragment();
        parts.forEach((part, i) => {
            if (i % 2 === 1) {
                const mark = document.createElement('mark');
                mark.className = 'highlight';
                mark.textContent = part;
                fragment.appendChild(mark);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });
        node.replaceWith(fragment);
    });
};

