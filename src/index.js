/* eslint-disable no-unused-vars */
import { GraphQLServer } from 'graphql-yoga';
import uuid4 from 'uuid/v4';
import dummyData from './data';


// define resolvers
const resolvers = {
  Query: {
    greet(parent, args, ctx, info) {
      const { name } = args;
      return `Hello ${name}!`;
    },
    users(parent, args, ctx, info) {
      return ctx.db.users;
    },
    posts(parent, args, ctx, info) {
      if (!args.title) {
        return ctx.db.posts;
      }

      return ctx.db.posts
        .filter((post) => post.title.toLowerCase().includes(args.title.toLowerCase()));
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments;
    },
  },
  // Let graphQL know about the relations
  Post: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find((user) => user.id === parent.author);
    },

    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter((comment) => comment.post === parent.id);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return ctx.db.posts.filter((post) => post.author === parent.id);
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find((user) => parent.author === user.id);
    },

    post(parent, args, ctx, info) {
      return ctx.db.posts.find((post) => post.id === parent.post);
    },
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emialInUse = ctx.db.users.some((user) => user.email === args.data.email);
      if (emialInUse) throw new Error('Email already in use');
      const user = {
        id: uuid4(), ...args.data,
      };
      ctx.db.users.push(user);
      return user;
    },

    createPost(parent, args, ctx, info) {
      // check author exits
      const validAuthor = ctx.db.users.some((user) => user.id === args.data.author);
      if (!validAuthor) throw new Error('Invalid User');
      const titleInUse = ctx.db.posts.some((post) => post.title === args.data.title);
      if (titleInUse) throw new Error('Duplicate title');
      const post = {
        id: uuid4(),
        ...args.data,
      };
      ctx.db.posts.push(post);
      return post;
    },

    createComment(parent, args, ctx, info) {
      // validate author
      const validAuthor = ctx.db.users.some((user) => user.id === args.data.author);
      if (!validAuthor) throw new Error('Invalid user');

      const validPost = ctx.db.posts.some((post) => post.id === args.data.post);
      if (!validPost) throw new Error('Invalid post');

      const comment = {
        id: uuid4(),
        ...args.data,
      };
      ctx.db.comments.push(comment);
      return comment;
    },
  },
};

// create the server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db: dummyData,
  },
});

// start the server
// eslint-disable-next-line no-console
server.start(() => console.log('Server is up and running'));
