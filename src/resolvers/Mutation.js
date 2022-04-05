const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function post(parent, args, context, info) {
  const userId = getUserId(context);

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  return newLink;
}

async function signup(parent, args, ctx, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await ctx.prisma.user.create({ data: { ...args, password } });

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || APP_SECRET );

  return {
    token,
    user,
  };
}

async function login(parent, args, ctx, info) {
  const user = await ctx.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || APP_SECRET);

  return {
    token,
    user,
  };
}
