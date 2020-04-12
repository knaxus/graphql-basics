/* eslint-disable no-unused-vars */
export default {
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
};
