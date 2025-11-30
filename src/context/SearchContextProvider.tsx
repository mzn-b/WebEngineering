import { useMemo, useState } from "react";
import { SearchContext } from "./SearchContext.tsx";

export const SearchProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [search, setSearch] = useState<string | undefined>();

  const values = useMemo(
    () => ({
      search,
      setSearch,
    }),
    [search, setSearch],
  );

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};
