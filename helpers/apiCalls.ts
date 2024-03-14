import dayjs from "dayjs";
import { Appointment } from "../library/Interface";

export const fetchAppointments = async (
  url: string,
  setAppointments?: React.Dispatch<React.SetStateAction<Appointment[]>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Appointment[]> => {
  try {
    const response = await fetch(url); // Use the API endpoint directly from the config
    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }
    const data = await response.json();
    const formattedData: Appointment[] = data.appointments
      .map((appointment: Appointment) => ({
        id: appointment.id,
        title: appointment.title,
        type: appointment.type,
        location: appointment.location,
        vendorName: appointment.vendor.name,
        buyerName: appointment.buyer.name,
        companyName: appointment.buyer.companyName,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        time: `${dayjs(appointment.startTime).format(
          "MMMM D, YYYY h:mm A"
        )} - ${dayjs(appointment.endTime).format("h:mm A")}`,
      }))
      .sort((a, b) => b.startTime - a.startTime);

    // Set the fetched appointments in the state if provided
    if (setAppointments) setAppointments(formattedData);

    // Set loading state to false after fetching and setting data
    if (setIsLoading) setIsLoading(false);

    return formattedData; // Return the fetched appointments
  } catch (error) {
    console.error("Error fetching appointments:", error);
    // Set loading state to false if an error occurs
    if (setIsLoading) setIsLoading(false);
    // Throw the error to be handled by the caller
    throw error;
  }
};
