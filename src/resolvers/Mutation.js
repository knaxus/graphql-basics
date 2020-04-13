/* eslint-disable no-unused-vars */
import { v4 as uuid4 } from 'uuid';

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
    const { db, pubsub } = ctx;
    const { data } = args;
    // check author exits
    const validAuthor = db.users.some((user) => user.id === data.author);
    if (!validAuthor) throw new Error('Invalid User');
    const titleInUse = db.posts.some((post) => post.title === data.title);
    if (titleInUse) throw new Error('Duplicate title');
    const post = {
      id: uuid4(),
      ...data,
    };
    db.posts.push(post);

    // publish about the post creation by the author
    pubsub.publish(`posts-${data.author}`, { post });
    return post;
  },

  createComment(parent, args, ctx, info) {
    const { db, pubsub } = ctx;
    // validate author
    const validAuthor = db.users.some((user) => user.id === args.data.author);
    if (!validAuthor) throw new Error('Invalid user');

    const validPost = db.posts.some((post) => post.id === args.data.post);
    if (!validPost) throw new Error('Invalid post');

    const comment = {
      id: uuid4(),
      ...args.data,
    };
    db.comments.push(comment);

    // publish the comment to the particular channel
    pubsub.publish(`comments-${args.data.post}`, { comment });

    return comment;
  },

  updateUser(parent, args, ctx, info) {
    const { id, data } = args;

    const user = ctx.db.users.find((u) => u.id === id);
    if (!user) throw new Error('Invalid user');

    if (typeof data.email === 'string') {
      const emailTaken = ctx.db.users.some((u) => u.email === data.email);
      if (emailTaken) throw new Error('Email already taken');
      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (data.age) {
      user.age = data.age;
    }

    return user;
  },
};
