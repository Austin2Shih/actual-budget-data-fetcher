/*
  Warnings:

  - Added the required column `bank_name` to the `enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."enrollment" ADD COLUMN     "bank_name" TEXT NOT NULL;
