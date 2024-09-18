/*
  Warnings:

  - You are about to drop the `PageView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PageView";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "visitor" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
