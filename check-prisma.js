const { prisma } = require('./src/lib/prisma');

async function check() {
  console.log('Prisma models:', Object.keys(prisma).filter(k => !k.startsWith('_')));
  process.exit(0);
}

check();
