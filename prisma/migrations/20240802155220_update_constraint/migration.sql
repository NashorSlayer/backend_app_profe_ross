/*
  Warnings:

  - A unique constraint covering the columns `[mail,form_id]` on the table `answers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,form_id]` on the table `areas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,creator_id]` on the table `forms` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "areas_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "answers_mail_form_id_key" ON "answers"("mail", "form_id");

-- CreateIndex
CREATE UNIQUE INDEX "areas_name_form_id_key" ON "areas"("name", "form_id");

-- CreateIndex
CREATE UNIQUE INDEX "forms_title_creator_id_key" ON "forms"("title", "creator_id");
