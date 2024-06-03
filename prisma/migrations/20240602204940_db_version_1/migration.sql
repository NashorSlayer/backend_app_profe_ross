/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `diabled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Areas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Surveys` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `time_range_start` DATETIME(3) NOT NULL,
    `time_range_end` DATETIME(3) NOT NULL,
    `answer_time_start` DATETIME(3) NOT NULL,
    `answer_time_end` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surveys_areas` (
    `id` VARCHAR(191) NOT NULL,
    `survey_id` VARCHAR(191) NOT NULL,
    `area_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer_areas` (
    `id` VARCHAR(191) NOT NULL,
    `survey_id` VARCHAR(191) NOT NULL,
    `area_id` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Surveys` ADD CONSTRAINT `Surveys_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surveys_areas` ADD CONSTRAINT `surveys_areas_survey_id_fkey` FOREIGN KEY (`survey_id`) REFERENCES `Surveys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surveys_areas` ADD CONSTRAINT `surveys_areas_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `Areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer_areas` ADD CONSTRAINT `Answer_areas_survey_id_fkey` FOREIGN KEY (`survey_id`) REFERENCES `Surveys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer_areas` ADD CONSTRAINT `Answer_areas_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `Areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
