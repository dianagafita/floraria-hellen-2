/*
  Warnings:

  - Added the required column `eventProductId` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "eventProductId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "EventProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "images_url" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_eventProductId_fkey" FOREIGN KEY ("eventProductId") REFERENCES "EventProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
