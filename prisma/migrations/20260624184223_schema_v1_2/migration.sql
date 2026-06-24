/*
  Warnings:

  - Made the column `description` on table `Opportunity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Opportunity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organization` on table `Opportunity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apply_url` on table `Opportunity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Opportunity" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "organization" SET NOT NULL,
ALTER COLUMN "apply_url" SET NOT NULL;
