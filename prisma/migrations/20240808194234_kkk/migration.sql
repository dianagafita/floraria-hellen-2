/*
  Warnings:

  - Added the required column `shipping_fee` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shipping_fee" INTEGER NOT NULL;
