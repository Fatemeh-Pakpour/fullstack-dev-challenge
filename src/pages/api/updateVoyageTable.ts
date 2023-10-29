import { type NextApiHandler, type NextApiResponse } from "next";
import { updateVoyageTable } from "~/service/updateVoyageTable";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            await updateVoyageTable()
            res.status(200).json({ message: 'Success' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
export default handler;