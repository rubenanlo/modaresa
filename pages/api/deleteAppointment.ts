// pages/api/deleteAppointment.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query; // Assuming you pass the appointment ID as a query parameter

      // Check if the appointment exists
      const appointmentExists = await prisma.appointment.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!appointmentExists) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      // Delete the appointment
      await prisma.appointment.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
