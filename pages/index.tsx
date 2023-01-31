import algoliasearch from "algoliasearch";
import { HeaderCompo } from "../components/SearchCompo";
import { HitsList } from "../components/HitsList";
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { createInstantSearchNextRouter } from "instantsearch-router-next-experimental";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getServerState } from "react-instantsearch-hooks-server";
import { renderToString } from "react-dom/server";
import singletonRouter from "next-translate-routes/router";

const connectionAlgolia = {
  testSandBox: ["latency", "6be0576ff61c053d5f9a3225e2a90f76"],
  RC: ["testingTQPMT5OMMI", "10436c48afe09ab5081eaa865e13e8d1"],
};

const searchClient = algoliasearch(
  connectionAlgolia.testSandBox[0],
  connectionAlgolia.testSandBox[1]
);

interface HomeProps {
  serverState?: InstantSearchServerState;
  serverUrl: string;
}

const Home = (props: HomeProps) => {
  return (
    <InstantSearchSSRProvider {...props.serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="movies"
        stalledSearchDelay={500}
        routing={{
          router: createInstantSearchNextRouter({
            serverUrl: props.serverUrl,
            singletonRouter,
          }),
        }}
      >
        <HeaderCompo />
        <div className="body-content">
          <HitsList />
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomeProps,
  ParsedUrlQuery
> = async (context) => {
  const protocol = context.req.headers.referer?.split("://")[0] || "https";
  const serverUrl = `${protocol}://${context.req.headers.host}${context.req.url}`;
  const serverState = await getServerState(<Home serverUrl={serverUrl} />, {
    renderToString,
  });

  return {
    props: {
      serverState: serverState,
      serverUrl: serverUrl,
    },
  };
};

export default Home;
