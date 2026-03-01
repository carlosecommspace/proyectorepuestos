-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'regular',
    "sedeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sede" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PartRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rawInput" TEXT NOT NULL,
    "partName" TEXT,
    "partCategory" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "version" TEXT,
    "year" INTEGER,
    "additionalNotes" TEXT,
    "normalizedData" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sedeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PartRequest_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PartRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sede_name_key" ON "Sede"("name");
