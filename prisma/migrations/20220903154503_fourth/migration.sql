/*
  Warnings:

  - A unique constraint covering the columns `[productId,quantity]` on the table `OrderProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_productId_quantity_key" ON "OrderProduct"("productId", "quantity");
