import React, { useState } from "react";
import { PlusIcon } from "./PlusIcon";
import { Button } from "./Button";
import AppointmentForm from "./AppointmentForm";

const NewAppointment = ({
  onAppointmentAdded,
  state: { isFormOpen, setIsFormOpen },
}) => {
  return (
    <>
      <Button variant="bold" onClick={() => setIsFormOpen(true)}>
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
