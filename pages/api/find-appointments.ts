import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Retrieve all appointments along with buyerName and vendorName
      const appointments = await prisma.appointment.findMany({
        include: {
          buyer: {
            select: {
              name: true,
            },
          },
          vendor: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json({ appointments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
