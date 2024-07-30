/*
  Warnings:

  - The primary key for the `areas_forms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `areas_forms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "areas_forms" DROP CONSTRAINT "areas_forms_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "areas_forms_pkey" PRIMARY KEY ("form_id", "area_id");
