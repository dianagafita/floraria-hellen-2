/*
  Warnings:

  - Added the required column `productId` to the `Eventproduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Eventproduct" ADD COLUMN     "productId" TEXT NOT NULL;
