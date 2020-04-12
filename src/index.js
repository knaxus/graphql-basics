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
    comments: [Comment]!
    isPublished: Boolean
  }

  type Comment {
    id: ID!
    body: String!
    user: User!
    post: Post!
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

    comments(parent, args, ctx, info) {
      return dummyData.comments.filter((comment) => comment.post === parent.id);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return dummyData.posts.filter((post) => post.author === parent.id);
    },
  },

  Comment: {
    user(parent, args, ctx, info) {
      return dummyData.users.find((user) => parent.user === user.id);
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
