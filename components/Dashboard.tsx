import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import UpNext from "./UpNext";
import FirstAppointment from "./FirstAppointment";
import AppointmentList from "./AppointmentList";
import NewAppointment from "./NewAppointment";
import TextLayout from "./TextLayout";
import { Container } from "./Container";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";
import { Appointment } from "../library/Interface";
import LoadingModal from "./LoadingModal";

interface DashboardState {
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

export interface DashboardProps {
  state: DashboardState;
}

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
    setIsLoading(true); // Set loading state to true before fetching data
    const fetchData = async () => {
      await fetchAppointments("/api/find-appointments", setAppointments);
    };
    fetchData();
    setIsLoading(false); // so that the FirstAppointment component doesn't render when submitting the first form
    // eslint-disable-next-line
  }, [refreshTrigger]);

  const nextAppointment: Appointment | undefined = appointments[0];

  return isLoading ? (
    <LoadingModal />
  ) : appointments.length === 0 ? (
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
