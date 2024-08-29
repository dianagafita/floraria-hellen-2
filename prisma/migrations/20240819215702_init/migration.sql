/*
  Warnings:

  - Added the required column `event_type` to the `EventProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventProduct" ADD COLUMN     "event_type" TEXT NOT NULL;
