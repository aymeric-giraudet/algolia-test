import { Link, useRouter } from "next-translate-routes";
import { UrlObject } from "url";

interface LinkNextProps {
  url?: string | UrlObject;
  children: React.ReactElement;
  onClick?: () => void;
}

export const LinkNext = (props: LinkNextProps) => {
  const router = useRouter();

  return router && props.url ? (
    <Link href={props.url} passHref>
      <a onClick={props.onClick}>{props.children}</a>
    </Link>
  ) : (
    props.children
  );
};
