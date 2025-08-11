/*
  Warnings:

  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Enrollment";

-- CreateTable
CREATE TABLE "public"."enrollment" (
    "id" SERIAL NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "bankName" TEXT,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_enrollment_id_key" ON "public"."enrollment"("enrollment_id");
