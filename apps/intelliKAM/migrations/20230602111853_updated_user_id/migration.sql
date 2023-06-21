/*
  Warnings:

  - The values [STANDARD,ADMIN] on the enum `leads_userType` will be removed. If these variants are still used in the database, this will fail.
  - The values [STANDARD,ADMIN] on the enum `users_userType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `leads` MODIFY `userType` ENUM('CUSTOMER_ADMIN', 'CUSTOMER_STANDARD', 'SUPER_ADMIN') NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `userType` ENUM('CUSTOMER_ADMIN', 'CUSTOMER_STANDARD', 'SUPER_ADMIN') NULL;
