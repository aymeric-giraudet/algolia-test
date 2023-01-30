import algoliasearch from "algoliasearch";
import { createInstantSearchNextRouter } from "instantsearch-router-next-experimental";
import { GetServerSideProps } from "next";
import { getServerState } from "react-instantsearch-hooks-server";
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { renderToString } from "react-dom/server";
import { ParsedUrlQuery } from "querystring";
import { LinkHome } from "../../../components/LinkHome";
import { Card } from "../../../components/Card";

interface CarteProps {
  serverState?: InstantSearchServerState;
  serverUrl: string;
  id: string;
}

const connectionAlgolia = {
  testSandBox: ["latency", "6be0576ff61c053d5f9a3225e2a90f76"],
  RC: ["testingTQPMT5OMMI", "10436c48afe09ab5081eaa865e13e8d1"],
};

const searchClient = algoliasearch(
  connectionAlgolia.testSandBox[0],
  connectionAlgolia.testSandBox[1]
);

const Carte = (props: CarteProps) => {
  return (
    <InstantSearchSSRProvider {...props.serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="movies"
        stalledSearchDelay={500}
        routing={{
          router: createInstantSearchNextRouter({
            serverUrl: props.serverUrl,
          }),
        }}
      >
        <LinkHome />
        <Card id={props.id} />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export const getServerSideProps: GetServerSideProps<
  CarteProps,
  ParsedUrlQuery
> = async (context) => {
  if (!context.query.id) {
    return { notFound: true };
  }

  const protocol = context.req.headers.referer?.split("://")[0] || "https";
  const serverUrl = `${protocol}://${context.req.headers.host}${context.req.url}`;
  const serverState = await getServerState(
    <Carte serverUrl={serverUrl} id={context.query.id.toString()} />,
    {
      renderToString,
    }
  );

  return {
    props: {
      serverState: serverState,
      serverUrl: serverUrl,
      id: context.query.id.toString(),
    },
  };
};

export default Carte;
