/*
  Warnings:

  - Changed the type of `time_start` on the `times_areas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time_end` on the `times_areas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "times_areas" DROP COLUMN "time_start",
ADD COLUMN     "time_start" TIMESTAMP(3) NOT NULL,
DROP COLUMN "time_end",
ADD COLUMN     "time_end" TIMESTAMP(3) NOT NULL;
