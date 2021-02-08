const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  input NewNote {
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    createNote(input: NewNote!): Note!
  }
`;

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const resolvers = {
  Query: {
    hello: () => 'Hello',
    notes: () => notes,
    note: (_parent, { id }) => notes.find(note => note.id === id)
  },
  Mutation: {
    createNote: (_parent, { input }) => {
      const { content, author } = input;
      const newNote = {
        id: String(notes.length + 1),
        content,
        author
      };
      notes.push(newNote);
      return newNote;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/gql' });

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(
    `Server listening on ${port} | GraphQL playground: ${server.graphqlPath}`
  );
});
