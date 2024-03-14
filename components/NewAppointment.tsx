import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";
import AppointmentForm from "./AppointmentForm";
import { State } from "../library/Interface";

interface NewAppointmentProps {
  state: State;
}

const NewAppointment: React.FC<NewAppointmentProps> = ({
  state: { isFormOpen, setIsFormOpen },
}) => {
  return (
    <>
      <Button variant="bold" onClick={() => setIsFormOpen(true)}>
        <PlusIcon />
      </Button>
      {isFormOpen && <AppointmentForm setIsFormOpen={setIsFormOpen} />}
    </>
  );
};

export default NewAppointment;
