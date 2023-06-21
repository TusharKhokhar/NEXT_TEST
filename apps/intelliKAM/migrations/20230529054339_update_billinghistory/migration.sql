/*
  Warnings:

  - Added the required column `address` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appartment` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobilePhone` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal` to the `billinghistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `billinghistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billinghistory` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `appartment` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `countryCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobilePhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `postal` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    MODIFY `planId` VARCHAR(191) NULL;
