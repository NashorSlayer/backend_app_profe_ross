/*
  Warnings:

  - You are about to drop the `Answer_areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Surveys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer_areas" DROP CONSTRAINT "Answer_areas_area_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer_areas" DROP CONSTRAINT "Answer_areas_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "Surveys" DROP CONSTRAINT "Surveys_user_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_areas" DROP CONSTRAINT "surveys_areas_area_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_areas" DROP CONSTRAINT "surveys_areas_survey_id_fkey";

-- DropTable
DROP TABLE "Answer_areas";

-- DropTable
DROP TABLE "Areas";

-- DropTable
DROP TABLE "Surveys";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time_range_start" TIMESTAMP(3) NOT NULL,
    "time_range_end" TIMESTAMP(3) NOT NULL,
    "answer_time_start" TIMESTAMP(3) NOT NULL,
    "answer_time_end" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer_areas" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "answer_areas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "areas_name_key" ON "areas"("name");

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_areas" ADD CONSTRAINT "surveys_areas_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_areas" ADD CONSTRAINT "surveys_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_areas" ADD CONSTRAINT "answer_areas_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_areas" ADD CONSTRAINT "answer_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
