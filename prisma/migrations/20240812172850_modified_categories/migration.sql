/*
  Warnings:

  - You are about to drop the column `color` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - Made the column `emoji` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "color",
DROP COLUMN "description",
ALTER COLUMN "emoji" SET NOT NULL;
