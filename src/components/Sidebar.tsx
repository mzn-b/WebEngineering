import { Highlight } from "./Highlight.tsx";

export const Sidebar = () => {
  return (
    <aside className="secondary">
      <h2>
        <Highlight text={"Related"} />
      </h2>
      <ul>
        <li>
          <a href="#">
            <Highlight text={"The trouble with Bees"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"The trouble with Otters"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"The trouble with Penguins"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"The trouble with Octopi"} />
          </a>
        </li>
        <li>
          <a href="#">
            <Highlight text={"The trouble with Lemurs"} />
          </a>
        </li>
      </ul>
    </aside>
  );
};
