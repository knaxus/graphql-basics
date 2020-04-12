/* eslint-disable no-unused-vars */
import uuid4 from 'uuid/v4';

export default {
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
};
