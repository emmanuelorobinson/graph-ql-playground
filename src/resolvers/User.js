function links(parent, args, ctx, info) {
  return ctx.prisma.user.findUnique({ where: { id: parent.id } }).links();
}

module.exports = {
    links,
};
