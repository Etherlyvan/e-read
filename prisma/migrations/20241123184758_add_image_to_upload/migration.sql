/*
  Warnings:

  - Made the column `genre` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pdf` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "pdf" SET NOT NULL;
