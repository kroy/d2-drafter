-- CreateTable
CREATE TABLE "SteamAccount" (
    "id" UUID NOT NULL,
    "nickname" STRING(255) NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);
