import type { NextApiHandler, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export type VesselsType = ({ value: string, label: string })[];

const handler: NextApiHandler = async (_, res: NextApiResponse<VesselsType>) => {
    const allVessel = await prisma.vessel.findMany();
    const vessels = allVessel.map(vessel => ({ label: vessel.name, value: vessel.id }))

    res.status(200).json(vessels);
};

export default handler;
