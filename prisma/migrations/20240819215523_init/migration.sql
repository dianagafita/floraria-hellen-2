-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_eventProductId_fkey";

-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_productId_fkey";

-- AlterTable
ALTER TABLE "Flower" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "eventProductId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_eventProductId_fkey" FOREIGN KEY ("eventProductId") REFERENCES "EventProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
