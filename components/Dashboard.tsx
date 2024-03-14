import React, { useEffect } from "react";
import TextLayout from "./TextLayout";
import { Container } from "./Container";
import UpNext from "./UpNext";
import NewAppointment from "./NewAppointment";
import AppointmentList from "./AppointmentList";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";
import { observer } from "mobx-react-lite";
import { Appointment } from "../library/InterfaceVariables";
import { DashboardProps } from "../library/InterfaceDashboardProps";
import FirstAppointment from "./FirstAppointment";

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const {
    appointments,
    setAppointments,
    refreshTrigger,
    setIsLoading,
    isLoading,
  } = useDataStore();

  // UseEffect set up to re-fetch data from the database once a new form is submitted:
  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointments(
        "/api/find-appointments",
        setAppointments,
        setIsLoading
      );
    };
    fetchData();
    setIsLoading(false);
  }, [refreshTrigger, setAppointments, setIsLoading]);

  const nextAppointment: Appointment | undefined = appointments[0];

  return isLoading ? null : appointments.length === 0 ? (
    <FirstAppointment state={state} />
  ) : (
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
