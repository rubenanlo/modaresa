import React, { useState } from "react";
import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";
import AppointmentForm from "./AppointmentForm";

const NewAppointment = ({ onAppointmentAdded }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <Button
        className="shrink-0 text-white bg-green-primary rounded-full w-52 h-52 px-16"
        onClick={() => setIsFormOpen(true)}
      >
        <PlusIcon />
      </Button>
      {isFormOpen && (
        <AppointmentForm
          setIsFormOpen={setIsFormOpen}
          onAppointmentAdded={onAppointmentAdded}
        />
      )}
    </>
  );
};

export default NewAppointment;
