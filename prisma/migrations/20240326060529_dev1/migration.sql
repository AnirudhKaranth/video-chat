/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `meetingId` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `meetingId` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,roomId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Participant_meetingId_idx";

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
DROP COLUMN "id",
DROP COLUMN "meetingId",
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("userId", "roomId");

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "meetingId",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Meeting";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Room_hostId_idx" ON "Room"("hostId");

-- CreateIndex
CREATE INDEX "Participant_roomId_idx" ON "Participant"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_roomId_key" ON "Participant"("userId", "roomId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
