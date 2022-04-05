const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "GraphQl Playground",
  },
];

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
