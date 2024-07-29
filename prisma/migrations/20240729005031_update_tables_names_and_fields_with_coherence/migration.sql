/*
  Warnings:

  - You are about to drop the `answer_areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `surveys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `surveys_areas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer_areas" DROP CONSTRAINT "answer_areas_area_id_fkey";

-- DropForeignKey
ALTER TABLE "answer_areas" DROP CONSTRAINT "answer_areas_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_user_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_areas" DROP CONSTRAINT "surveys_areas_area_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_areas" DROP CONSTRAINT "surveys_areas_survey_id_fkey";

-- DropTable
DROP TABLE "answer_areas";

-- DropTable
DROP TABLE "surveys";

-- DropTable
DROP TABLE "surveys_areas";

-- CreateTable
CREATE TABLE "forms" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas_forms" (
    "id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,

    CONSTRAINT "areas_forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "form_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("form_id","area_id")
);

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas_forms" ADD CONSTRAINT "areas_forms_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas_forms" ADD CONSTRAINT "areas_forms_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
