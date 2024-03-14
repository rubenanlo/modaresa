interface Person {
  name: string;
  companyName: string;
}

export interface Appointment {
  id: string;
  title: string;
  type: string;
  location?: string;
  vendorName: string;
  buyerName: string;
  companyName: string;
  time: string;
  vendor: Person;
  buyer: Person;
  startTime: string;
  endTime: string;
}

export interface IndexProps {
  data: Appointment[];
}

export interface DataState {
  appointments: Appointment[];
  setAppointments: (value: Appointment[]) => void;
  refreshTrigger: number;
  setRefreshTrigger: () => void;
  setIsLoading: (value: boolean) => void;
}

export interface DashboardProps {
  state: object;
}

export interface FormResponse {
  appointmentId?: number;
  vendorName?: string;
  buyerName?: string;
  companyName?: string;
  appointmentData?: {
    title?: string;
    type?: string;
    location?: string;
    startTime?: string;
    endTime?: string;
  };
}

export interface AppointmentFormProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialFormData?: FormResponse; // Add initialFormData prop to receive data for update
  setInitialData: React.Dispatch<React.SetStateAction<FormResponse | null>>; // Add setInitialData prop
}
