/*
  Warnings:

  - You are about to drop the column `address` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `appartment` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `creditFrequency` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `goLiveDate` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `includedVideos` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `mobilePhone` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `paymentTerm` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `postal` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `ratePerVideo` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `renewalPreriod` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionModel` on the `billinghistory` table. All the data in the column will be lost.
  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `billinghistory` DROP FOREIGN KEY `billinghistory_planId_fkey`;

-- AlterTable
ALTER TABLE `billinghistory` DROP COLUMN `address`,
    DROP COLUMN `appartment`,
    DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `countryCode`,
    DROP COLUMN `creditFrequency`,
    DROP COLUMN `dueDate`,
    DROP COLUMN `email`,
    DROP COLUMN `firstName`,
    DROP COLUMN `goLiveDate`,
    DROP COLUMN `includedVideos`,
    DROP COLUMN `jobTitle`,
    DROP COLUMN `lastName`,
    DROP COLUMN `mobilePhone`,
    DROP COLUMN `paymentMethod`,
    DROP COLUMN `paymentTerm`,
    DROP COLUMN `postal`,
    DROP COLUMN `ratePerVideo`,
    DROP COLUMN `renewalPreriod`,
    DROP COLUMN `state`,
    DROP COLUMN `stripeCustomerId`,
    DROP COLUMN `subscriptionModel`,
    ADD COLUMN `expiryDate` DATETIME(3) NULL,
    ADD COLUMN `purchaseDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `plans`;

-- CreateTable
CREATE TABLE `activePlans` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `planId` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
