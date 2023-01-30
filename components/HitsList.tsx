import {
  Hits,
  Pagination,
  SortBy,
  Stats,
  useHits,
  UseHitsProps,
} from "react-instantsearch-hooks-web";
import { HitCompo } from "../components/HitCompo";

export const HitsList = (props: UseHitsProps) => {
  const { hits } = useHits(props);

  return (
    <main>
      <div className="information">
        <div className="stats">
          <Stats />
        </div>
      </div>
      {hits.map((hit) => (
        <HitCompo key={hit.__queryID} hit={hit} />
      ))}

      <div>
        <Pagination />
      </div>
    </main>
  );
};
