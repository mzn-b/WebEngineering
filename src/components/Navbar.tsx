import { Search } from "./Search.tsx";
import { Highlight } from "./Highlight.tsx";

export const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="#">
            <Highlight text={"Home"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"Our team"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"Projects"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"Blog"} />
          </a>
        </li>
      </ul>

      <Search />
    </nav>
  );
};
