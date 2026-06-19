export const typeDefs = `

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
`;