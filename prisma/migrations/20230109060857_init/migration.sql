-- CreateEnum
CREATE TYPE "JOB_LOCATION" AS ENUM ('bury', 'bolton', 'manchester', 'oldham', 'rochdale', 'salford', 'stockport', 'tameside', 'trafford', 'wigan');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "company" TEXT NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "location" "JOB_LOCATION" NOT NULL,
    "description" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "applyLink" TEXT NOT NULL,
    "expiresOn" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '30 days',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "belongsToId" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_belongsToId_key" ON "Job"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
