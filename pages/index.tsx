import { useEffect, useState } from "react";
import { URL as url } from "../config";
import AppLayout from "../components/AppLayout";
import { fetchAppointments } from "../helpers/apiCalls";
import { useDataStore } from "../providers/dataStore";
import FirstAppointment from "../components/FirstAppointment";
import Dashboard from "../components/Dashboard";
import { observer } from "mobx-react-lite";
import { Appointment, IndexProps } from "../library/Interface";

const Index: React.FC<IndexProps> = ({ data }) => {
  const {
    appointments,
    setAppointments,
    refreshTrigger,
    isLoading,
    setIsLoading,
  } = useDataStore();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Setting up the initial state of appointments:
  useEffect(() => {
    setAppointments(data);
    setIsLoading(false);
  }, [data, isLoading]);

  return isLoading ? null : (
    <AppLayout>
      {data.length === 0 && refreshTrigger === 0 ? (
        <FirstAppointment state={{ isFormOpen, setIsFormOpen }} />
      ) : (
        <Dashboard state={{ isFormOpen, setIsFormOpen, setIsLoading }} />
      )}
    </AppLayout>
  );
};

export const getStaticProps = async () => {
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
