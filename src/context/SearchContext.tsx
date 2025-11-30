import { createContext } from "react";

interface SearchContextValue {
  search: string | undefined;
  setSearch: (v: string) => void;
}

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined,
);
