import { useEffect, useState } from "react";
import { fetchBearData, fetchImageUrl } from "./fetchBearData.ts";
import { Highlight } from "./Highlight.tsx";

export interface Bear {
  name: string;
  binomial: string;
  fileName?: string;
  range: string;
}

export const BearData = () => {
  const [bears, setBears] = useState<Bear[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const baseBears = await fetchBearData();

        const bearsWithImages = await Promise.all(
          baseBears.map(async (b) => ({
            ...b,
            fileName: await fetchImageUrl(b.fileName),
          })),
        );

        setBears(bearsWithImages);
      } catch {
        setError("Failed to fetch more bear data.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <section className="more_bears">
      <h3>
        <Highlight text={"More Bears"} />
      </h3>

      {error && (
        <p className="error">
          <Highlight text={"{error}"} />
        </p>
      )}
      {loading && (
        <p>
          <Highlight text={"Loading bears…"} />
        </p>
      )}

      <div className="bear-list">
        {bears.map((bear) => (
          <div key={bear.name} className="bear">
            <img
              src={bear.fileName ?? "media/wild-bear.png"}
              alt={`This is a ${bear.name}`}
              width={200}
            />
            <p>
              <b>
                <Highlight text={bear.name} />
              </b>
              ({bear.binomial})
            </p>
            <p>
              <Highlight text={`Range: ${bear.range}`} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
