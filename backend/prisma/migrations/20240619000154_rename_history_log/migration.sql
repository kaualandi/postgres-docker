/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "history";

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "resultType" "ResultType" NOT NULL,
    "isCritical" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
