import { useHits, UseHitsProps } from "react-instantsearch-hooks-web";
import { HitCompo } from "./HitCompo";

interface CardProps extends UseHitsProps {
  id: string;
}

export const Card = (props: CardProps) => {
  const { hits } = useHits(props);

  const data = hits.find((hit) => hit.objectID === props.id);
  if (!data) {
    return null;
  }
  return (
    <main>
      <HitCompo hit={data} />
    </main>
  );
};
