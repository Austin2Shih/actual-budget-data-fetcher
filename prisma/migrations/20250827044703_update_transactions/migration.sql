/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
