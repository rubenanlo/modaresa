import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { URL as url } from "../config";
import AppLayout from "../components/AppLayout";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";
import Dashboard from "../components/Dashboard";
import { Appointment } from "../library/Interface";

interface IndexProps {
  data: Appointment[];
}
const Index: React.FC<IndexProps> = ({ data }) => {
  const { setAppointments, isLoading, setIsLoading } = useDataStore();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Setting up the initial state of appointments, and clearing the loading and isFirstAppointment state
  useEffect(() => {
    setAppointments(data); // setting appointments state with the fetched data in global state management
    setIsLoading(false); // setting loading state to false after fetching data to render content in index.tsx
    //eslint-disable-next-line
  }, [data, isLoading]);

  // TODO: to create a loading component for better user experience
  return isLoading ? null : (
    <AppLayout>
      <Dashboard state={{ isFormOpen, setIsFormOpen, setIsLoading }} />
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

export default observer(Index);
