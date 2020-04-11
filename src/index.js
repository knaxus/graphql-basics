import { GraphQLServer } from 'graphql-yoga';

// Define a schema
const typeDefs = `
  type Query {
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

// define resolvers
const resolvers = {
  Query: {
    user() {
      return {
        id: 99,
        name: 'Red Skull',
        email: 'rs@skull.com',
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
