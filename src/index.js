/* eslint-disable no-unused-vars */
import { GraphQLServer } from 'graphql-yoga';
import dummyData from './data';

// Define a schema
const typeDefs = `
  type Query {
    greet(name: String): String!
    users: [User!]
    posts: [Post!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID
    title: String!
    body: String!
    isPublished: Boolean
  }
`;

// define resolvers
const resolvers = {
  Query: {
    greet(parent, args, ctx, info) {
      const { name } = args;
      return `Hello ${name}!`;
    },
    users(parent, args, ctx, info) {
      return dummyData.users;
    },
    posts(parent, args, ctx, info) {
      return dummyData.posts;
    },
  },
};

// create the server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// start the server
// eslint-disable-next-line no-console
server.start(() => console.log('Server is up and running'));
