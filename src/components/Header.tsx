import { Highlight } from "./Highlight.tsx";

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <Highlight text={"Welcome to our wildlife website"} />
      </h1>
    </header>
  );
};
