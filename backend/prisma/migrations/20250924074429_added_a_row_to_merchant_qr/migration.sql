/*
  Warnings:

  - Added the required column `merchantName` to the `MerchantQR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MerchantQR" ADD COLUMN     "merchantName" TEXT NOT NULL;
