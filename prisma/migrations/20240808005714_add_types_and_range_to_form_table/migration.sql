/*
  Warnings:

  - Added the required column `range` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "range" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
