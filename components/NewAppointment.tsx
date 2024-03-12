import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";
import AppointmentForm from "./AppointmentForm";

const NewAppointment = ({ state: { isFormOpen, setIsFormOpen } }) => {
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
