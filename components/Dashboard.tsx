import React, { useEffect } from "react";
import TextLayout from "./TextLayout";
import { Container } from "./Container";
import UpNext from "./UpNext";
import NewAppointment from "./NewAppointment";
import AppointmentList from "./AppointmentList";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";
import { observer } from "mobx-react-lite";

interface DashboardProps {
  nextAppointment: any; // You should replace 'any' with the appropriate type for nextAppointment
  state: any; // You should replace 'any' with the appropriate type for state
  appointments: any[]; // You should replace 'any[]' with the appropriate type for appointments
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const { appointments, setAppointments, refreshTrigger } = useDataStore();
  console.log("🚀 ~ refreshTrigger:", refreshTrigger);

  console.log("🚀 ~ appointments:", appointments);
  // UseEffect set up to re-fetch data from the database once a new form is submitted:
  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointments(
        "/api/find-appointments",
        setAppointments,
        state.setIsLoading
      );
    };
    fetchData();
  }, [refreshTrigger, setAppointments, state.setIsLoading]);

  const nextAppointment: Appointment | undefined = appointments[0];

  return (
    <>
      <Container
        className={{
          dimension: "lg:-mt-5 my-20 lg:max-w-4xl",
          background: "bg-white",
          border: "px-5 py-10 rounded-sm shadow-md shadow-blue-primary",
        }}
      >
        <TextLayout.Title as="h1" title="Up Next" />
        <Container.Flex
          className={{
            position: "mt-0",
          }}
        >
          <UpNext nextAppointment={nextAppointment} />
          <NewAppointment state={state} />
          {/* Pass refresh function as prop */}
        </Container.Flex>
      </Container>
      <AppointmentList state={state} appointments={appointments} />
    </>
  );
};

export default observer(Dashboard);
