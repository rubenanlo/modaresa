import { createContext, useContext, FC } from "react";
import { useLocalObservable } from "mobx-react-lite";

interface DataState {
  appointments: string;
  refreshTrigger: number;
  setAppointments: (value: string) => void;
  setRefreshTrigger: () => void;
}

const dataStoreContext = createContext<DataState | null>(null);

export const DataStoreProvider: FC = ({ children }) => {
  const dataState = useLocalObservable<DataState>(() => ({
    appointments: "",
    refreshTrigger: 0,

    setAppointments(value: string) {
      this.appointments = value;
    },

    setRefreshTrigger() {
      this.refreshTrigger += 1;
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
