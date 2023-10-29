import type { Vessel, Voyage } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from "~/server/db";

export type ResType = Voyage & { vessel: Vessel };
const createHandler = async (req: NextApiRequest, res: NextApiResponse<ResType>) => {
    if (req.method === "POST") {
        try {
            await prisma.voyage.create({
                data: req.body
            });
            res.status(200).json(req.body);
        }
        catch (error) {
            console.error('Error creating Voyage:', error);
        }
    }
}

export default createHandler;
