/*
  Warnings:

  - You are about to drop the column `flowers` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "flowers";

-- CreateTable
CREATE TABLE "Flower" (
    "id" SERIAL NOT NULL,
    "cantitate" INTEGER NOT NULL,
    "flower" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Flower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
