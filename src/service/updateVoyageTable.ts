import { prisma } from "~/server/db";

function shuffleArray<T>(array: (T | undefined)[]): (T | undefined)[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export async function updateVoyageTable() {
    const voyages = await prisma.voyage.findMany();
    const unitTypesData = await prisma.unitType.findMany();
    for (const voyage of voyages) {
        const shuffledUnitTypes = shuffleArray(unitTypesData);
        const selectedUnitTypes = shuffledUnitTypes.slice(0, 5);
        await prisma.voyage.update({
            where: { id: voyage.id },
            data: {
                unitTypes: {
                    connect: selectedUnitTypes.map((unitType) => ({ id: unitType?.id })),
                },
            },
        });
    }
}
