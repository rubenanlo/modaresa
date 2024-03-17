import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { vendorName, buyerName, companyName, appointmentData } = req.body;

    try {
      // Check for an existing vendor
      let vendor = await prisma.vendor.findUnique({
        where: {
          name: vendorName,
        },
      });
      if (!vendor) {
        // Create a new vendor if it doesn't exist
        vendor = await prisma.vendor.create({
          data: {
            name: vendorName,
          },
        });
      }

      // Check for an existing buyer
      let buyer = await prisma.buyer.findUnique({
        where: {
          name: buyerName,
        },
      });
      if (!buyer) {
        // Create a new buyer if it doesn't exist
        buyer = await prisma.buyer.create({
          data: {
            name: buyerName,
            companyName,
          },
        });
      }

      // Create the appointment with references to the vendor and buyer
      const appointment = await prisma.appointment.create({
        data: {
          // Appointment data
          title: appointmentData.title,
          type: appointmentData.type,
          location: appointmentData.location,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          vendorId: vendor.id,
          buyerId: buyer.id,
        },
      });

      res.status(201).json({ appointment, vendor, buyer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
