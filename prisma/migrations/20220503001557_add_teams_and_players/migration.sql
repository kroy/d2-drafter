/*
  Warnings:

  - A unique constraint covering the columns `[player_id]` on the table `SteamAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `player_id` to the `SteamAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SteamAccount" ADD COLUMN     "player_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Player" (
    "id" UUID NOT NULL,
    "name" STRING(255) NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "id" UUID NOT NULL,
    "name" STRING(255) NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToPlayerTeam" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToPlayerTeam_AB_unique" ON "_PlayerToPlayerTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToPlayerTeam_B_index" ON "_PlayerToPlayerTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "SteamAccount_player_id_key" ON "SteamAccount"("player_id");

-- AddForeignKey
ALTER TABLE "SteamAccount" ADD CONSTRAINT "SteamAccount_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToPlayerTeam" ADD CONSTRAINT "_PlayerToPlayerTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToPlayerTeam" ADD CONSTRAINT "_PlayerToPlayerTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
