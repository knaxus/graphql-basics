import { GraphQLServer } from 'graphql-yoga';
import dummyData from './data';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Post from './resolvers/Post';


// create the server
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  /**
   * Note it's very important, the name of resolvers
   * must match the names in the Schema
   *
   * if tye User in schema, use User in resolver, not Users
   * */
  resolvers: {
    Query,
    Post,
    User,
    Comment,
    Mutation,
  },
  context: {
    db: dummyData,
  },
});

// start the server
// eslint-disable-next-line no-console
server.start(() => console.log('Server is up and running'));
