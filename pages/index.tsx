import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import AppointmentList from "../components/AppointmentList";
import UpNext from "../components/UpNext";
import { Container } from "../components/Container";
import NewAppointment from "../components/NewAppointment";
import TextLayout from "../components/TextLayout";
import Hero from "../components/Hero";
import dayjs from "dayjs";

const Index = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments data from the API endpoint
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/findAppointments"); // Adjust the API endpoint URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        const formattedData = data.appointments
          .map((appointment) => {
            return {
              ...appointment,
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
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const nextAppointment = appointments[0];

  return isLoading ? null : (
    <AppLayout>
      <Container
        className={{
          dimension: "-mt-5 my-20",
          background: "bg-white",
          border: "px-5 py-10 rounded-sm shadow-md shadow-blue-primary",
        }}
      >
        <TextLayout.Title title="Up Next" />
        <Container.Columns
          className={{
            grid: "grid-cols-2",
          }}
        >
          <UpNext nextAppointment={nextAppointment} />
          <NewAppointment />
        </Container.Columns>
      </Container>
      <AppointmentList appointments={appointments} />
    </AppLayout>
  );
};

export default Index;
