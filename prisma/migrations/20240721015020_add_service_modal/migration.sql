/*
  Warnings:

  - Added the required column `serviceId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `VehicleLocationPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Trip` ADD COLUMN `serviceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `VehicleLocationPrice` ADD COLUMN `serviceId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleLocationPrice` ADD CONSTRAINT `VehicleLocationPrice_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
