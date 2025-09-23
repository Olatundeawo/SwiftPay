/*
  Warnings:

  - A unique constraint covering the columns `[qrId]` on the table `MerchantQR` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."MerchantQR" ADD COLUMN     "qrId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MerchantQR_qrId_key" ON "public"."MerchantQR"("qrId");
