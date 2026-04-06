require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function test() {
  try {
    const p = await prisma.project.create({
      data: {
        title: "Test",
        slug: "test-" + Date.now(),
        description: "Test",
      }
    });
    console.log("Success:", p.id);
    await prisma.project.delete({ where: { id: p.id } });
  } catch (e) {
    console.error("Error creating:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
