/*
  Warnings:

  - You are about to drop the column `area_id` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `disabled` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the `areas_forms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mail` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_id` to the `areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_area_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_form_id_fkey";

-- DropForeignKey
ALTER TABLE "areas_forms" DROP CONSTRAINT "areas_forms_area_id_fkey";

-- DropForeignKey
ALTER TABLE "areas_forms" DROP CONSTRAINT "areas_forms_form_id_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_user_id_fkey";

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "area_id",
DROP COLUMN "time",
ADD COLUMN     "mail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "areas" ADD COLUMN     "form_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "disabled",
DROP COLUMN "user_id",
ADD COLUMN     "creator_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "areas_forms";

-- CreateTable
CREATE TABLE "times_areas" (
    "id" TEXT NOT NULL,
    "time_start" DOUBLE PRECISION NOT NULL,
    "time_end" DOUBLE PRECISION NOT NULL,
    "area_id" TEXT NOT NULL,
    "answer_id" TEXT NOT NULL,

    CONSTRAINT "times_areas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times_areas" ADD CONSTRAINT "times_areas_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times_areas" ADD CONSTRAINT "times_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
