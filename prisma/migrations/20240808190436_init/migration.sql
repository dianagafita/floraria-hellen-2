/*
  Warnings:

  - Added the required column `cart_total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_fee` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cart_total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "recipient_info" TEXT[],
ADD COLUMN     "sender_info" TEXT[],
ADD COLUMN     "shipping_fee" INTEGER NOT NULL;
