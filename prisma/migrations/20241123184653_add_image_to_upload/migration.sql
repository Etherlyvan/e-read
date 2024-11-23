/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "books_isbn_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "author",
DROP COLUMN "isbn",
DROP COLUMN "publishedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "pdf" TEXT;
