/* eslint-disable no-unused-vars */
export default {
  author(parent, args, ctx, info) {
    return ctx.db.users.find((user) => parent.author === user.id);
  },

  post(parent, args, ctx, info) {
    return ctx.db.posts.find((post) => post.id === parent.post);
  },
};
