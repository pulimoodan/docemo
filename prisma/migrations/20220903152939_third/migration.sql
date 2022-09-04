/*
  Warnings:

  - You are about to drop the column `orderId` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "_OrderToOrderProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToOrderProduct_AB_unique" ON "_OrderToOrderProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToOrderProduct_B_index" ON "_OrderToOrderProduct"("B");

-- AddForeignKey
ALTER TABLE "_OrderToOrderProduct" ADD CONSTRAINT "_OrderToOrderProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderProduct" ADD CONSTRAINT "_OrderToOrderProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
