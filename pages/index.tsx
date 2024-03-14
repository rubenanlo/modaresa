import { useEffect, useState } from "react";
import { URL as url } from "../config";
import AppLayout from "../components/AppLayout";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";
import FirstAppointment from "../components/FirstAppointment";
import Dashboard from "../components/Dashboard";

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
  }, [data, setAppointments]);

  // UseEffect set up to re-fetch data from the database once a new form is submitted:
  useEffect(() => {
    fetchAppointments("/api/find-appointments", setAppointments, setIsLoading);
  }, [refreshTrigger, setAppointments]);

  const nextAppointment: Appointment | undefined = appointments[0];

  return isLoading ? null : (
    <AppLayout>
      {data.length === 0 && refreshTrigger === 0 ? (
        <FirstAppointment state={{ isFormOpen, setIsFormOpen }} />
      ) : (
        <Dashboard
          nextAppointment={nextAppointment}
          state={{ isFormOpen, setIsFormOpen }}
          appointments={appointments}
        />
      )}
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
