const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    notes: [Note!]!
  }

  input SigUpInput {
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    username: String
    email: String
    password: String!
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
    users: [User!]!
    user(username: String!): User!
    me: User!
  }

  type Mutation {
    signUp(input: SigUpInput!): String!
    signIn(input: SignInInput!): String!
    createNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
  }
`;
