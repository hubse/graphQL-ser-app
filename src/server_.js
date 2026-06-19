import express from "express";
import { graphql, buildSchema } from "graphql";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const app = express();
app.use(express.json());

// Build schema
const schema = buildSchema(typeDefs);

// Root resolver adapter (bridge GraphQL -> JS resolvers)
const root = {
  user: resolvers.Query.user,
  users: resolvers.Query.users
};

// GraphQL endpoint
app.post("/graphql", async (req, res) => {
  const { query, variables } = req.body;

  try {
    const result = await graphql({
      schema,
      source: query,
      rootValue: root,
      variableValues: variables
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("GraphQL server running on http://localhost:4000/graphql");
});