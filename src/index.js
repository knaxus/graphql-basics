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
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    author: ID!
    isPublished: Boolean!
  }

  input CreateCommentInput {
    body: String!
    author: ID!
    post: ID!
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
      const emialInUse = dummyData.users.some((user) => user.email === args.data.email);
      if (emialInUse) throw new Error('Email already in use');
      const user = {
        id: uuid4(), ...args.data,
      };
      dummyData.users.push(user);
      return user;
    },

    createPost(parent, args, ctx, info) {
      // check author exits
      const validAuthor = dummyData.users.some((user) => user.id === args.data.author);
      if (!validAuthor) throw new Error('Invalid User');
      const titleInUse = dummyData.posts.some((post) => post.title === args.data.title);
      if (titleInUse) throw new Error('Duplicate title');
      const post = {
        id: uuid4(),
        ...args.data,
      };
      dummyData.posts.push(post);
      return post;
    },

    createComment(parent, args, ctx, info) {
      // validate author
      const validAuthor = dummyData.users.some((user) => user.id === args.data.author);
      if (!validAuthor) throw new Error('Invalid user');

      const validPost = dummyData.posts.some((post) => post.id === args.data.post);
      if (!validPost) throw new Error('Invalid post');

      const comment = {
        id: uuid4(),
        ...args.data,
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
