// pages/api/findAppointment.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query; // Assuming you pass the appointment ID as a query parameter

      const appointment = await prisma.appointment.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          vendor: true, // Include related vendor
          buyer: true, // Include related buyer
        },
      });

      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      res.status(200).json({ appointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
