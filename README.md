# GraphQL Server (Express + graphql)

Node.js GraphQL server implemented with **Express** and the **graphql** package.

## Features
- GraphQL endpoint at: **POST http://localhost:4000/graphql**
- Queries:
  - `users`: list all users (with their modules)
  - `user(userId: ID!)`: fetch a single user (with their modules)
- Current data source: **mock/in-memory data** (see `src/db/mockDb.js` + `src/services/userService.js`)
- IBM DB connection helper exists in `src/db/Db.js`, but it is **not currently wired up** to the active `UserService`.

## Prerequisites
- Node.js **>= 18**

## Install & Run
```bash
npm install
npm run dev
```
Server starts on:
- http://localhost:4000/graphql

## GraphQL Schema (high level)
```graphql
type Module {
  ModuleId: ID!
  ModuleName: String!
}

type User {
  userId: ID!
  userName: String!
  groupCd: String
  modules: [Module]
}

type Query {
  user(userId: ID!): User
  users: [User]
}
```

## Example Requests (curl)

### 1) Get all users
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { users { userId userName groupCd modules { ModuleId ModuleName } } }"
  }'
```

### 2) Get a single user
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { user(userId: 101) { userId userName groupCd modules { ModuleId ModuleName } } }"
  }'
```

## Project Structure
- `src/server.js` - Express server + GraphQL endpoint
- `src/graphql/schema.js` - GraphQL type definitions
- `src/graphql/resolvers.js` - Resolver wiring (calls `UserService`)
- `src/services/userService.js` - Business logic (currently uses mock DB)
- `src/db/mockDb.js` - In-memory mock users/modules
- `src/db/Db.js` - IBM DB query helper (not wired to current service)
