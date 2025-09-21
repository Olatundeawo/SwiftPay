-- CreateEnum
CREATE TYPE "public"."QRStatus" AS ENUM ('PENDING', 'USED', 'EXPIRED');

-- CreateTable
CREATE TABLE "public"."MerchantQR" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "qrString" TEXT NOT NULL,
    "status" "public"."QRStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MerchantQR_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MerchantQR" ADD CONSTRAINT "MerchantQR_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
