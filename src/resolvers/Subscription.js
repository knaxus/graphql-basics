/* eslint-disable no-unused-vars */
export default {
  comment: {
    subscribe(parent, args, ctx, info) {
      const { postId } = args;
      const { db, pubsub } = ctx;

      // find the post
      const post = db.posts.find((p) => p.id === postId && p.isPublished);
      if (!post) throw new Error('Post not found');

      // subscribe to the comments for the particular post id
      return pubsub.asyncIterator(`comments-${postId}`);
    },
  },

};
