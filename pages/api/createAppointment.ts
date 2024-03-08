import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Extract data from the request body
    const { vendorName, buyerName, companyName, appointmentData } = req.body;

    try {
      // Create a new vendor with the provided name
      const vendor = await prisma.vendor.create({
        data: {
          name: vendorName, // Add the name field
        },
      });

      // Create a new buyer
      const buyer = await prisma.buyer.create({
        data: {
          name: buyerName,
          companyName: companyName,
        },
      });

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
            id: { equals: appointmentData.id }, // Exclude the current appointment if updating
          },
        },
      });

      if (overlappingAppointments.length > 0) {
        // Conflict found, throw an error
        throw new Error("Time conflict with existing appointments");
      }

      // Create a new appointment
      const appointment = await prisma.appointment.create({
        data: {
          title: appointmentData.title,
          type: appointmentData.type,
          location: appointmentData.location,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          vendorId: vendor.id, // Use the ID of the created vendor
          buyerId: buyer.id, // Use the ID of the created buyer
        },
      });
      res.status(201).json({ appointment, vendor, buyer });
      console.log("Request Body:", req.body); // Log the request body
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
