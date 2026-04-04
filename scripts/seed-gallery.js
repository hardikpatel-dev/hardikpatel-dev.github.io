const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const works = [
  "/assets/workGrid/work1.png",
  "/assets/workGrid/work2.png",
  "/assets/workGrid/work3.png",
  "/assets/workGrid/work4.png",
  "/assets/workGrid/work5.png",
  "/assets/workGrid/work6.png",
  "/assets/workGrid/work7.png",
  "/assets/workGrid/work8.png",
  "/assets/workGrid/work10.png",
  "/assets/workGrid/work9.png",
  "/assets/workGrid/work13.png",
  "/assets/workGrid/work11.png",
  "/assets/workGrid/work12.png",
];

async function main() {
  console.log("Seeding gallery images...");
  
  // Clear existing gallery images if any to prevent duplicates during multiple seeds
  await prisma.galleryImage.deleteMany({});

  for (let i = 0; i < works.length; i++) {
    await prisma.galleryImage.create({
      data: {
        imageUrl: works[i],
        sortOrder: i,
        isActive: true,
      }
    });
  }

  console.log("Seeded", works.length, "gallery images!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
