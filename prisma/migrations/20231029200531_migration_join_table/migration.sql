-- CreateTable
CREATE TABLE "_UnitTypeToVoyage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UnitTypeToVoyage_A_fkey" FOREIGN KEY ("A") REFERENCES "UnitType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UnitTypeToVoyage_B_fkey" FOREIGN KEY ("B") REFERENCES "Voyage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UnitTypeToVoyage_AB_unique" ON "_UnitTypeToVoyage"("A", "B");

-- CreateIndex
CREATE INDEX "_UnitTypeToVoyage_B_index" ON "_UnitTypeToVoyage"("B");
