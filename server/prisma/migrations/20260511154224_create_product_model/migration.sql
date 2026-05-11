/*
  Warnings:

  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discountPercent` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountedPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount",
DROP COLUMN "price",
DROP COLUMN "reviewCount",
ADD COLUMN     "aboutProduct" TEXT,
ADD COLUMN     "discountPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountedPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reviewContent" TEXT,
ADD COLUMN     "reviewTitle" TEXT,
ADD COLUMN     "userName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");
