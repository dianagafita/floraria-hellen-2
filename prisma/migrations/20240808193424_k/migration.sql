/*
  Warnings:

  - You are about to drop the column `shipping_fee` on the `Order` table. All the data in the column will be lost.
  - Added the required column `delivery` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shipping_fee",
ADD COLUMN     "delivery" INTEGER NOT NULL;
