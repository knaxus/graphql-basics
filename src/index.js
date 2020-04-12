/* eslint-disable no-unused-vars */
import { GraphQLServer } from 'graphql-yoga';
import dummyData from './data';

// Define a schema
const typeDefs = `
  type Query {
    greet(name: String): String!
    users: [User!]!
    posts(title: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID
    title: String!
    body: String!
    author: User!
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
      if (!args.title) {
        return dummyData.posts;
      }

      return dummyData.posts.filter((post) => post.title.toLowerCase().includes(args.title.toLowerCase()));
    },
  },
  // Let graphQL know about the relations
  Post: {
    author(parent, args, ctx, info) {
      return dummyData.users.find((user) => user.id === parent.author);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return dummyData.posts.filter((post) => post.author === parent.id);
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
