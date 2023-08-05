import React from "react";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { Get_Document_Uploaded_By_APP } from "../graphql/queries";

const BrowsePaper = () => {
  <Head>
    <title>Browse uploaded paper</title>
    <meta name="description" content="Browse uploaded paper to the permweb" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;
  const { loading, error, data } = useQuery(Get_Document_Uploaded_By_APP, {
    variables: {
      tags: [{ name: "application-name", values: ["arweave-hackathon"] }],
    },
  });

  //console.log("application data ", data && data.transactions.edges[0].node);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="h-screen mt-16">
      <div className="flex justify-center items-center">
        <div className="w-1/2">
          <div className="mt-4">
            <p className="text-center">Uploaded Papers</p>
            {data &&
              data.transactions.edges.map(({ node }, index) =>
                
                node.tags.map(({ name, value }, p) => {
                  if (name === "title") {
                    return <a key={p} href={`/paper/${node.id}`}>{value.toUpperCase()}</a>;
                  }
                })
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePaper;

// [
//   {
//     tx: "1234",
//     timestamp: 12,
//     tx_reply: "5677",
//   },
//   {
//     tx: "1345",
//     timestamp: 12,
//     tx_reply: "5677",
//   },
//   {
//     tx: "5677",
//     timestamp: 12,
//     tx_reply: "1234",
//   },
//   {
//     tx: "1456",
//     timestamp: 12,
//     tx_reply: "1345",
//   },
//   {
//     tx: "7681",
//     timestamp: 12,
//     tx_reply: "",
//   },
// ];

// [
//   {
//     id: "1234",
//     reply: [
//       {
//         tx: "5677",
//         timestamp: 12,
//         tx_reply: "1234",
//       },
//     ],
//   },

//   {
//     id: "1345",
//     reply: [
//       {
//         tx: "5677",
//         timestamp: 12,
//         tx_reply: "1234",
//       },
//     ],
//   },

//   {
//     id: "5677",
//     reply: [],
//   },

//   {
//     id: "1456",
//     reply: [
//       {
//         tx: "1345",
//         timestamp: 12,
//         tx_reply: "5677",
//       },
//     ],
//   },
//   {
//     id: "7681",
//     reply: [],
//   },
// ];
