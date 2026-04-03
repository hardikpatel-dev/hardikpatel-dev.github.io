-- CreateEnum
CREATE TYPE "TestimonialStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "imageUrl" TEXT,
    "feedback" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "TestimonialStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
