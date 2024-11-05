/*
  Warnings:

  - You are about to drop the column `product_id` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `product_name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "product_id",
ADD COLUMN     "images_url" TEXT[],
ADD COLUMN     "product_flowers" TEXT[],
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "product_price" DOUBLE PRECISION NOT NULL;
