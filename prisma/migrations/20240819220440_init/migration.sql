/*
  Warnings:

  - You are about to drop the `EventProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_eventProductId_fkey";

-- DropTable
DROP TABLE "EventProduct";

-- CreateTable
CREATE TABLE "Eventproduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "images_url" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eventproduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_eventProductId_fkey" FOREIGN KEY ("eventProductId") REFERENCES "Eventproduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
