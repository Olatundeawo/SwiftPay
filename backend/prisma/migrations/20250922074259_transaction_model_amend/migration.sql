/*
  Warnings:

  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'success',
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
