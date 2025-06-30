-- CreateTable
CREATE TABLE "entry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addprizecode" INTEGER,
    "state" TEXT,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT,
    "ticketNumber" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entry_ticketNumber_key" ON "entry"("ticketNumber");
