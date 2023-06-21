/*
  Warnings:

  - Made the column `planId` on table `billinghistory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `stripeProductId` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `billinghistory` DROP FOREIGN KEY `billinghistory_planId_fkey`;

-- AlterTable
ALTER TABLE `billinghistory` MODIFY `planId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `plans` ADD COLUMN `stripeProductId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `billinghistory` ADD CONSTRAINT `billinghistory_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
