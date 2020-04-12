/* eslint-disable no-unused-vars */
import { GraphQLServer } from 'graphql-yoga';
import uuid4 from 'uuid/v4';
import dummyData from './data';

// Define a schema
const typeDefs = `
  type Query {
    greet(name: String): String!
    users: [User!]!
    posts(title: String): [Post!]!
    comments: [Comment!]!
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
    comments: [Comment!]!
    isPublished: Boolean
  }

  type Comment {
    id: ID!
    body: String!
    author: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, author: ID!, isPublished: Boolean!): Post!
    createComment(body: String!, author: ID!, post: ID!): Comment!
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
    comments(parent, args, ctx, info) {
      return dummyData.comments;
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
    author(parent, args, ctx, info) {
      return dummyData.users.find((user) => parent.author === user.id);
    },

    post(parent, args, ctx, info) {
      return dummyData.posts.find((post) => post.id === parent.post);
    },
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emialInUse = dummyData.users.some((user) => user.email === args.email);
      if (emialInUse) throw new Error('Email already in use');
      const user = {
        id: uuid4(), name: args.name, email: args.email, age: args.age || null,
      };
      dummyData.users.push(user);
      return user;
    },

    createPost(parent, args, ctx, info) {
      // check author exits
      const validAuthor = dummyData.users.some((user) => String(user.id) === String(args.author));
      if (!validAuthor) throw new Error('Invalid User');
      const titleInUse = dummyData.posts.some((post) => post.title === args.title);
      if (titleInUse) throw new Error('Duplicate title');
      const post = {
        id: uuid4(),
        title: args.title,
        body: args.body,
        author: args.author,
        isPublished: args.isPublished || false,
      };
      dummyData.posts.push(post);
      return post;
    },

    createComment(parent, args, ctx, info) {
      // validate author
      const validAuthor = dummyData.users.some((user) => String(user.id) === String(args.author));
      if (!validAuthor) throw new Error('Invalid user');

      const validPost = dummyData.posts.some((post) => String(post.id) === String(args.post));
      if (!validPost) throw new Error('Invalid post');

      const comment = {
        id: uuid4(),
        body: args.body,
        post: args.post,
        author: args.author,
      };
      dummyData.comments.push(comment);
      return comment;
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
