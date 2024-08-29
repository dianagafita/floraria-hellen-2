/*
  Warnings:

  - Added the required column `recipient_info` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "recipient_info" JSONB NOT NULL;
