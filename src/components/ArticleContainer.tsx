import { Highlight } from "./Highlight.tsx";
import { CommentContainer } from "./CommentContainer.tsx";
import { BearData } from "./BearData.tsx";
import { Audio } from "./Audio.tsx";

export const ArticleContainer = () => {
  return (
    <article id="content">
      <h2>
        <Highlight text={"The trouble with Bears"} />
      </h2>
      <p>
        <Highlight text={"By Evan Wild "} />
      </p>
      <p>
        <Highlight
          text={
            "Tall, lumbering, angry, dangerous. The real live bears of this world are proud, independent creatures, self-serving and always on the hunt for food."
          }
        />
      </p>
      <h3>
        <Highlight text={"Types of bear"} />
      </h3>
      <table aria-describedby="bear-table-summary">
        <caption>
          <Highlight text={"Bear characteristics comparison"} />
        </caption>
        <thead>
          <tr>
            <th scope="col">
              <Highlight text={"Bear Type"} />
            </th>
            <th scope="col">
              <Highlight text={"Coat"} />
            </th>
            <th scope="col">
              <Highlight text={"Adult size"} />
            </th>
            <th scope="col">
              <Highlight text={"Habitat"} />
            </th>
            <th scope="col">
              <Highlight text={"Lifespan"} />
            </th>
            <th scope="col">
              <Highlight text={"Diet"} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <Highlight text={"Wild"} />
            </th>
            <td>
              <Highlight text={"Brown or black"} />
            </td>
            <td>
              <Highlight text={"1.4 to 2.8 meters"} />
            </td>
            <td>
              <Highlight text={"Woods and forests"} />
            </td>
            <td>
              <Highlight text={"25 to 28 years"} />
            </td>
            <td>
              <Highlight text={"Fish, meat, plants"} />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <Highlight text={"Urban"} />
            </th>
            <td>
              <Highlight text={"North Face"} />
            </td>
            <td>
              <Highlight text={"18 to 22"} />
            </td>
            <td>
              <Highlight text={"Condos and coffee shops"} />
            </td>
            <td>
              <Highlight text={"20 to 32 years"} />
            </td>
            <td>
              <Highlight text={"Starbucks, sushi"} />
            </td>
          </tr>
        </tbody>
      </table>

      <p id="bear-table-summary" className="visually-hidden">
        <Highlight
          text={
            " This table compares wild and urban bears across six attributes including coat color, adult size, habitat, lifespan, and diet."
          }
        />
      </p>

      <h3>
        <Highlight text={"Habitats and Eating habits"} />
      </h3>
      <p>
        <Highlight
          text={
            "Wild bears eat a variety of meat, fish, fruit, nuts, and other natually growing ingredients..."
          }
        />
      </p>
      <img src="media/wild-bear.jpg" alt="Wild bear in forest" />
      <p>
        <Highlight
          text={
            "Urban (gentrified) bears on the other hand have largely abandoned the old ways..."
          }
        />
      </p>
      <img src="media/urban-bear.jpg" alt="Urban bear near buildings" />

      <h3>
        <Highlight text={"Mating rituals"} />
      </h3>
      <p>
        <Highlight text={"Bears are romantic creatures by nature..."} />
      </p>

      <Audio />

      <section>
        <h3>
          <Highlight text={"About the author"} />
        </h3>
        <p>
          <Highlight
            text={"Evan Wild is an unemployed plumber from Doncaster..."}
          />
        </p>
      </section>

      <CommentContainer />

      <BearData />
    </article>
  );
};
