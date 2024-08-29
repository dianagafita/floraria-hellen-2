/*
  Warnings:

  - You are about to drop the column `cantitate` on the `Flower` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "cantitate",
ADD COLUMN     "quantity" INTEGER NOT NULL;
