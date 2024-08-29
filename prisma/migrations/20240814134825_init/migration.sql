/*
  Warnings:

  - Added the required column `quantity` to the `Extra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extra" ADD COLUMN     "quantity" INTEGER NOT NULL;
