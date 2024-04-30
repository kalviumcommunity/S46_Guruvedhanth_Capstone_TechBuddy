const { gql } = require('apollo-server');

const typeDefs = gql`
  type Comment {
    id: ID!
    answerId: String!
    user: String!
    comments: String!
  }

  type Query {
    comments(answerId: String!): [Comment!]!
  }

  type Mutation {
    addComment(answerId: String!, user: String!, comments: String!): Comment!
  }

  type Subscription {
    newComment(answerId: String!): Comment!
  }
`;

module.exports = typeDefs;

