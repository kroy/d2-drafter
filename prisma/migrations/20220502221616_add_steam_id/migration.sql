/*
  Warnings:

  - Added the required column `steam_id` to the `SteamAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SteamAccount" ADD COLUMN     "steam_id" BIGINT NOT NULL;
