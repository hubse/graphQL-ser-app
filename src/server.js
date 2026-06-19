import express from "express";
import { graphql, buildSchema } from "graphql";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const app = express();

app.use(express.json());

const schema = buildSchema(typeDefs);

app.post("/graphql", async (req, res) => {
  const { query, variables } = req.body;

  try {
    const result = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables
    });

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000/graphql");
});