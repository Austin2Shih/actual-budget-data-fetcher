/*
  Warnings:

  - You are about to drop the column `bankName` on the `enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."enrollment" DROP COLUMN "bankName",
ADD COLUMN     "bank_name" TEXT;
