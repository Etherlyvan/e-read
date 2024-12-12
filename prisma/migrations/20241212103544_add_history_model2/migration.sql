/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `histories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "histories_userId_bookId_key" ON "histories"("userId", "bookId");
