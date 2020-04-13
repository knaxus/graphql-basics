/* eslint-disable no-unused-vars */
export default {
  count: {
    subscribe(parent, args, ctx, info) {
      let count = 0;
      setInterval(() => {
        count += 1;
        ctx.pubsub.publish('count', {
          count,
        });
      }, 1000);
      return ctx.pubsub.asyncIterator('count');
    },
  },
};
