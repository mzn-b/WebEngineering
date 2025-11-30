import type { FC } from "react";
import { useSearch } from "../hooks/useSearch.tsx";

interface HighlightProps {
  text: string;
}

export const Highlight: FC<HighlightProps> = ({ text }) => {
  const { search } = useSearch();

  if (!search) return text;

  const escaped = search.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  const regex = new RegExp(`(${escaped})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="highlight">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
};
