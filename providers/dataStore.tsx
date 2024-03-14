import { createContext, useContext, FC } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { Appointment, DataState } from "../library/Interface";

const dataStoreContext = createContext<DataState | null>(null);

export const DataStoreProvider: FC = ({ children }) => {
  const dataState = useLocalObservable<DataState>(() => ({
    appointments: [],
    refreshTrigger: 0,
    isLoading: true,

    setAppointments(value: Appointment[]) {
      this.appointments = value;
    },

    setRefreshTrigger() {
      this.refreshTrigger += 1;
    },
    setIsLoading(value: boolean) {
      this.isLoading = value;
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
