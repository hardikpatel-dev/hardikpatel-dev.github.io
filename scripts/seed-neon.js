const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_JnY52tIsbViz@ep-cold-credit-amr23i19-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

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

async function seed() {
  try {
    await client.connect();
    console.log("Connected to Neon Database.");
    
    // Check if empty first
    const res = await client.query('SELECT COUNT(*) FROM "GalleryImage"');
    if (parseInt(res.rows[0].count) > 0) {
        console.log("Already seeded!");
        await client.end();
        return;
    }

    for (let i = 0; i < works.length; i++) {
      await client.query(`INSERT INTO "GalleryImage" ("imageUrl", "sortOrder", "isActive", "createdAt") VALUES ($1, $2, $3, NOW())`, [works[i], i, true]);
      console.log(`Inserted ${works[i]}`);
    }
    console.log("Successfully seeded 13 records to Neon!");
  } catch (err) {
    console.error("Failed to seed:", err);
  } finally {
    await client.end();
  }
}

seed();
