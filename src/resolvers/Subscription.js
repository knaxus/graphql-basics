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

  post: {
    subscribe(parent, args, ctx, info) {
      const { db, pubsub } = ctx;
      const { userId } = args;

      const user = db.users.find((u) => u.id === userId);
      if (!user) throw new Error('User not found');

      return pubsub.asyncIterator(`posts-${userId}`);
    },
  },

};
