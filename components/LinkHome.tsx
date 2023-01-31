import { Link } from "next-translate-routes";
import { LinkNext } from "./LinkNext";

export const LinkHome = () => {
  return (
    <LinkNext url="/">
      <div>Accueil</div>
    </LinkNext>
  );
};
