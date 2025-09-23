/*
  Warnings:

  - Made the column `qrId` on table `MerchantQR` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."MerchantQR" ALTER COLUMN "qrId" SET NOT NULL;
