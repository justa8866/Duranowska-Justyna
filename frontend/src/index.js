import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import "normalize.css";
import "./index.css";

const client = new ApolloClient({
  uri: "https://us-central1-ecommerce-6e27c.cloudfunctions.net/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App client={client} />
  </React.StrictMode>
);
