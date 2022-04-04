const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "GraphQl Playground",
  },
];

const resolvers = {
  Query: {
    info: () => "Hello world!",
  },

  Mutation: {
    
  },
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: { prisma },
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
