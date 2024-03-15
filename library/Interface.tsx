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

export interface DataState {
  appointments: Appointment[];
  setAppointments: (value: Appointment[]) => void;
  refreshTrigger: number;
  setRefreshTrigger: () => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
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

export interface State {
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  formResponse: FormResponse;
  setFormResponse: (value: FormResponse) => void;
}

export type NavigationItem = {
  name: string;
  href: string;
  target?: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  current?: boolean;
};

// Animations:
export interface TransitionOptions {
  when?: "beforeChildren" | "afterChildren";
  staggerChildren?: number;
}

export interface AnimationState {
  opacity: number;
  height?: number | "auto";
  transition?: TransitionOptions;
  x?: number | string;
}

export interface AnimationVariants {
  visible: AnimationState;
  hidden: AnimationState;
}
