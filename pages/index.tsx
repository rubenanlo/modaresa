import { useEffect, useState } from "react";
import { URL as url } from "../config";
import AppLayout from "../components/AppLayout";
import AppointmentList from "../components/AppointmentList";
import UpNext from "../components/UpNext";
import { Container } from "../components/Container";
import NewAppointment from "../components/NewAppointment";
import TextLayout from "../components/TextLayout";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";

interface Appointment {
  id: string;
  title: string;
  type: string;
  location?: string;
  vendorName: string;
  buyerName: string;
  companyName: string;
  time: string;
}

interface IndexProps {
  data: Appointment[];
}

const Index: React.FC<IndexProps> = ({ data }) => {
  const { appointments, setAppointments, refreshTrigger } = useDataStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Setting up the initial state of appointments:
  useEffect(() => {
    setAppointments(data);
  }, [data]);

  // UseEffect set up to re-fetch data from the database once a new form is submitted:
  useEffect(() => {
    fetchAppointments("/api/find-appointments", setAppointments, setIsLoading);
  }, [refreshTrigger]);

  const nextAppointment: Appointment | undefined = appointments[0];

  return isLoading ? null : (
    <AppLayout>
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
          <NewAppointment state={{ isFormOpen, setIsFormOpen }} />
          {/* Pass refresh function as prop */}
        </Container.Flex>
      </Container>
      <AppointmentList
        state={{ isFormOpen, setIsFormOpen }}
        appointments={appointments}
      />
    </AppLayout>
  );
};

export const getServerSideProps = async () => {
  const data: Appointment[] = await fetchAppointments(
    `${url}/api/find-appointments`
  );
  return {
    props: {
      data,
    },
  };
};

export default Index;
