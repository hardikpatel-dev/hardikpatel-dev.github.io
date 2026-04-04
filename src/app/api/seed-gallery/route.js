import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
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
    
    return NextResponse.json({ message: "Seeded successfully", count: works.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
