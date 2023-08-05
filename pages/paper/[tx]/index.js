import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GetDocumentByTransactionID } from "../../../graphql/queries";
import { useEffect, useState } from "react";
import Head from "next/head";

const PaperDetailsPage = ({ paper, error, paperId }) => {
  <Head>
    <title>Paper Details</title>
    <meta name="description" content="Paper details" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [field, setField] = useState("");
  const [publishIn, setPublishIn] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (paper) {
      setTimestamp(paper.timestamp);
      setAddress(paper.address);
      paper.tags.map(({ name, value }) => {
        switch (name) {
          case "title":
            setTitle(value);
            break;
          case "abstract":
            setAbstract(value);
            break;
          case "publishIn":
            setPublishIn(value);
            break;
          case "author":
            setAuthor(value);
            break;
          case "field":
            setField(value);
            break;
          case "keywords":
            setKeywords(value);
            break;
        }
      });
    }
  }, []);

  return (
    <div className="flex justify-center item-center mt-16">
      <div className="w-1/2">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Paper Details</h2>
          <ul className="list-none pl-6 pl-6">
            <li>Date uploaded: {timestamp}</li>
            <li>Uploader Address: {address}</li>
            <li>Paper Title: {title}</li>
            <li>Author: {author}</li>
            <li>Field: {field}</li>
            <li>Publish In: {publishIn && publishIn.toUpperCase()}</li>
          </ul>
          <h3 className="text-lg font-bold mt-4">Abstract</h3>
          <p className="p-2 text-gray-800 font-medium bg-white rounded-lg">
            {abstract}
          </p>
          <h3 className="text-lg font-bold mt-4">Keywords</h3>
          <p className="p-2 text-white font-bold bg-gray-500 rounded-lg ">
            {keywords}
          </p>

          <div className="mt-4 text-center">
            <a
              href={`https://arweave.net/${paperId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="bg-green-500 hover:bg-green-700 
          text-white font-bold py-2 px-4 rounded"
              >
                Download Paper
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsPage;

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  uri: "https://node1.bundlr.network/graphql/",
  cache: new InMemoryCache(),
});

export const getServerSideProps = async (context) => {
  const { tx } = context.query;
  try {
    const { data } = await client.query({
      query: GetDocumentByTransactionID,
      variables: {
        ids: tx,
        ssr: true,
      },
    });

    return {
      props: {
        paper: data.transactions.edges[0].node,
        paperId: tx,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        paper: null,
        paperId: null,
        error: "Paper not found",
      },
    };
  }
};
