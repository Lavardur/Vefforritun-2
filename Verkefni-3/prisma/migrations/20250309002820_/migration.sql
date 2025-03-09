/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `categorySlug` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_categoryId_fkey";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "categoryId",
ADD COLUMN     "categorySlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Categories"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
