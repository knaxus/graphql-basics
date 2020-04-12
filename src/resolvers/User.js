/* eslint-disable no-unused-vars */
export default {
  posts(parent, args, ctx, info) {
    return ctx.db.posts.filter((post) => post.author === parent.id);
  },
};
