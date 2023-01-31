import Image from "next/image";
import { BaseHit } from "instantsearch.js";
import { useHits, UseHitsProps } from "react-instantsearch-hooks-web";
import { Link } from "next-translate-routes";
import { LinkNext } from "./LinkNext";

interface HitModel {
  hit: any;
}

export const HitCompo = (props: HitModel) => {
  if (!props.hit) {
    return null;
  }
  return (
    <LinkNext url={`/carte/${props.hit.objectID}`}>
      <div className="card">
        <div className="card-image">
          <Image
            src={props.hit.image}
            width="80"
            height="100"
            alt={props.hit.name}
            className="image"
          />
        </div>
        <div className="card-contents">
          <div className="card-rating">Rating: {props.hit.rating}</div>
          <div className="card-genre">
            <span>{props.hit.genre[0]}</span> <span>{props.hit.genre[1]}</span>
          </div>
        </div>
      </div>
    </LinkNext>
  );
};
