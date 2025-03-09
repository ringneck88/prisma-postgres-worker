-- CreateTable
CREATE TABLE "entry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addprizecode" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT NOT NULL,
    "ticketnumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entry_ticketnumber_key" ON "entry"("ticketnumber");
