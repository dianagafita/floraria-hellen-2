-- CreateTable
CREATE TABLE "Extra" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderItemExtras" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderItemExtras_AB_unique" ON "_OrderItemExtras"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderItemExtras_B_index" ON "_OrderItemExtras"("B");

-- AddForeignKey
ALTER TABLE "_OrderItemExtras" ADD CONSTRAINT "_OrderItemExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItemExtras" ADD CONSTRAINT "_OrderItemExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
