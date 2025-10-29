const prisma = require('./client');

async function main() {
  const b = await prisma.board.create({ data: { title: 'Test Board (from script)' } });
  const boards = await prisma.board.findMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
