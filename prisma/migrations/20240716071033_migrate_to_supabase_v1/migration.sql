-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surveys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time_range_start" TIMESTAMP(3) NOT NULL,
    "time_range_end" TIMESTAMP(3) NOT NULL,
    "answer_time_start" TIMESTAMP(3) NOT NULL,
    "answer_time_end" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys_areas" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,

    CONSTRAINT "surveys_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer_areas" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Answer_areas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Areas_name_key" ON "Areas"("name");

-- AddForeignKey
ALTER TABLE "Surveys" ADD CONSTRAINT "Surveys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_areas" ADD CONSTRAINT "surveys_areas_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_areas" ADD CONSTRAINT "surveys_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer_areas" ADD CONSTRAINT "Answer_areas_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer_areas" ADD CONSTRAINT "Answer_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
