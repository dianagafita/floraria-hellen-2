/*
  Warnings:

  - You are about to drop the column `cart_total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `recipient_info` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `sender_info` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_fee` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cart_total",
DROP COLUMN "recipient_info",
DROP COLUMN "sender_info",
DROP COLUMN "shipping_fee";
