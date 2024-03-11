import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // Change method to PUT for update operation
    // Extract data from the request body
    const {
      appointmentId,
      vendorName,
      buyerName,
      companyName,
      appointmentData,
    } = req.body;

    try {
      // Update the vendor if provided, or create a new one if not provided
      let vendor;
      if (vendorName) {
        vendor = await prisma.vendor.upsert({
          where: { name: vendorName },
          update: {},
          create: { name: vendorName },
        });
      }

      // Update the buyer if provided, or create a new one if not provided
      let buyer;
      if (buyerName && companyName) {
        buyer = await prisma.buyer.upsert({
          where: { name: buyerName },
          update: { companyName },
          create: { name: buyerName, companyName },
        });
      }

      // Check for time conflicts
      const overlappingAppointments = await prisma.appointment.findMany({
        where: {
          OR: [
            {
              // Check if the appointment starts during an existing appointment
              AND: [
                { startTime: { lte: appointmentData.startTime } },
                { endTime: { gt: appointmentData.startTime } },
              ],
            },
            {
              // Check if the appointment ends during an existing appointment
              AND: [
                { startTime: { lt: appointmentData.endTime } },
                { endTime: { gte: appointmentData.endTime } },
              ],
            },
            {
              // Check if the appointment fully encompasses an existing appointment
              AND: [
                { startTime: { gte: appointmentData.startTime } },
                { endTime: { lte: appointmentData.endTime } },
              ],
            },
          ],
          NOT: {
            id: { equals: appointmentId }, // Exclude the current appointment if updating
          },
        },
      });

      if (overlappingAppointments.length > 0) {
        // Conflict found, throw an error
        throw new Error("Time conflict with existing appointments");
      }

      // Update the appointment
      const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          title: appointmentData.title,
          type: appointmentData.type,
          location: appointmentData.location,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          vendorId: vendor ? vendor.id : undefined,
          buyerId: buyer ? buyer.id : undefined,
        },
      });

      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
