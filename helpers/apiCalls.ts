import dayjs from "dayjs";
import { Appointment, FormResponse } from "../library/Interface";

export const fetchAppointments = async (
  url: string,
  setAppointments?: React.Dispatch<React.SetStateAction<Appointment[]>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Appointment[]> => {
  try {
    if (setIsLoading) {
      setIsLoading(true); // Set loading state to true before fetching data
    }
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
    if (setAppointments && setIsLoading) {
      await setAppointments(formattedData);
      setIsLoading(false); // Set loading state to false after fetching data
    } else {
      return formattedData;
    } // Return the fetched appointments
  } catch (error) {
    console.error("Error fetching appointments:", error);
    // Throw the error to be handled by the caller
    throw error;
  }
};

export const handleDelete = async (
  appointmentId: number,
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true); // Set loading state to true before fetching data
    const response = await fetch(
      `/api/delete-appointment?id=${appointmentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete appointment");
    }
    setRefreshTrigger(); // Trigger refresh by toggling refreshTrigger
    setOpenDeleteModal(false); // Close the modal to return to the appointment list
  } catch (error) {
    console.error("Error deleting appointment:", error);
    alert("An error occurred while deleting the appointment.");
  }
};

export const handleCreateEdit = async (
  e: React.FormEvent<HTMLFormElement>,
  formResponse: FormResponse,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setFormResponse: React.Dispatch<React.SetStateAction<FormResponse>>,
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setRefreshTrigger: () => void // Assuming this is a function with no parameters and no return value
): Promise<void> => {
  setIsLoading(true);
  e.preventDefault();

  const method = formResponse.appointmentId ? "PUT" : "POST";
  const url = formResponse.appointmentId
    ? `/api/update-appointment`
    : `/api/create-appointment`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formResponse),
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    // Reset or update state as needed
    setFormResponse({});
    setIsFormOpen(false);
    setRefreshTrigger(); // Assuming this toggles a boolean state to refresh some data
  } catch (error) {
    console.error(error);
    alert("An error occurred while saving the appointment.");
  }
};
