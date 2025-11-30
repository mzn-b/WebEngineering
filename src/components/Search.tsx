import { useSearch } from "../context/SearchContextProvider.tsx";
import { useState } from "react";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { setSearch } = useSearch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearch(searchValue);
      }}
      className="search"
    >
      <input
        aria-label="Search"
        type="search"
        name="q"
        placeholder="Search query"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <input type="submit" value="Go!" />
    </form>
  );
};
