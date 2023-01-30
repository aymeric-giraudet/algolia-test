import { Link } from "next-translate-routes/Link";
import { useEffect } from "react";
import { useHits, UseHitsProps } from "react-instantsearch-hooks-web";
import { HitCompo } from "./HitCompo";
import { LinkNext } from "./LinkNext";

interface SelfCompoPros extends UseHitsProps {
  id: string;
}
export const SelfCompo = (props: SelfCompoPros) => {
  const { hits } = useHits(props);

  useEffect(() => {
    console.log("props.id", props.id);
  }, [props.id]);

  const data = hits.find((hit) => hit.objectID === props.id);
  if (!data) {
    return null;
  }

  return (
    <main>
      <LinkNext url={"/destinations/europe"}>
        <div>Accueil</div>
      </LinkNext>
      <HitCompo hit={data} />
    </main>
  );
};
