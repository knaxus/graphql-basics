import { GraphQLServer } from 'graphql-yoga';

// Define a schema
const typeDefs = `
  type Query {
    greet(name: String): String!
    user: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID
    title: String!
    body: String!
    isPublished: Boolean
  }
`;

// define resolvers
const resolvers = {
  Query: {
    greet(parent, args, ctx, info) {
      const { name } = args;
      return `Hello ${name}!`;
    },
    user() {
      return {
        id: 99,
        name: 'Red Skull',
        email: 'rs@skull.com',
      };
    },
    post() {
      return {
        id: 2131,
        title: 'Kick-off GraphQL',
        body: 'Setup and initial schemas with resolvers using graphql yoga',
        isPublished: false,
      };
    },
  },
};

// create the server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// start the server
server.start(() => console.log('Server is up and running'));
