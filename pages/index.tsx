import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import AppointmentList from "../components/AppointmentList";
import UpNext from "../components/UpNext";
import { Container } from "../components/Container";
import NewAppointment from "../components/NewAppointment";
import TextLayout from "../components/TextLayout";
import dayjs from "dayjs";

const Index = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State variable to trigger refresh

  useEffect(() => {
    console.log(appointments);
    // Fetch appointments data from the API endpoint
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/find-appointments"); // Adjust the API endpoint URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        const formattedData = data.appointments
          .map((appointment) => {
            return {
              ...appointment,
              vendorName: appointment.vendor.name,
              buyerName: appointment.buyer.name,
              time: `${dayjs(appointment.startTime).format(
                "MMMM D, YYYY h:mm A"
              )} - ${dayjs(appointment.endTime).format("h:mm A")}`,
            };
          })
          .sort((a, b) => b.startTime - a.startTime);
        setAppointments(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [refreshTrigger]); // Add refreshTrigger to the dependency array

  const nextAppointment = appointments[0];
  const remainingAppointments = appointments.slice(1);

  // Function to refresh appointments
  const refreshAppointments = () => {
    // Increment refreshTrigger to trigger useEffect
    setRefreshTrigger((prevTrigger) => prevTrigger + 1);
  };

  return isLoading ? null : (
    <AppLayout>
      <Container
        className={{
          dimension: "lg:-mt-5 my-20 lg:max-w-4xl",
          background: "bg-white",
          border: "px-5 py-10 rounded-sm shadow-md shadow-blue-primary",
        }}
      >
        <TextLayout.Title title="Up Next" />
        <Container.Flex
          className={{
            position: "mt-0",
          }}
        >
          <UpNext nextAppointment={nextAppointment} />
          <NewAppointment onAppointmentAdded={refreshAppointments} />{" "}
          {/* Pass refresh function as prop */}
        </Container.Flex>
      </Container>
      <AppointmentList appointments={remainingAppointments} />
    </AppLayout>
  );
};

export default Index;
