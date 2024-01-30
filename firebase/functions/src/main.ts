import {ApolloServer} from "apollo-server-express";
import express from "express";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

export const app = express();

void async function() {
  await server.start();
  server.applyMiddleware({app, path: "/"});
}();
