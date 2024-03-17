import { createContext, useContext, FC, ReactNode } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { Appointment, DataState } from "../library/Interface";

const dataStoreContext = createContext<DataState | null>(null);

interface DataStoreProps {
  children: ReactNode;
}

export const DataStoreProvider: FC<DataStoreProps> = ({ children }) => {
  const dataState = useLocalObservable<DataState>(() => ({
    appointments: [],
    refreshTrigger: 0,
    isLoading: true,
    isFirstAppointment: false,

    setAppointments(value: Appointment[]) {
      this.appointments = value;
    },

    setRefreshTrigger() {
      this.refreshTrigger += 1;
    },
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
    setIsFirstAppointment(value: boolean) {
      this.isFirstAppointment = value;
    },
  }));

  return (
    <dataStoreContext.Provider value={dataState}>
      {children}
    </dataStoreContext.Provider>
  );
};

export const useDataStore = (): DataState => {
  const state = useContext(dataStoreContext);
  if (!state)
    throw new Error("Cannot use useDataStore outside of DataStoreContext");
  return state;
};
