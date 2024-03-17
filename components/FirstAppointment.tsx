import React from "react";
import { Container } from "./Container";
import NewAppointment from "./NewAppointment";
import TextLayout from "./TextLayout";
import { State } from "../library/Interface";

interface FirstAppointmentProps {
  state: State; // You should replace 'any' with the appropriate type for state
}

const FirstAppointment: React.FC<FirstAppointmentProps> = ({ state }) => {
  return (
    <Container.Flex
      className={{ flex: "justify-center items-center h-[70vh] gap-x-10" }}
    >
      <TextLayout.Title
        as="h1"
        title="No appointments yet, create your first now!"
      />
      <NewAppointment state={state} />
    </Container.Flex>
  );
};

export default FirstAppointment;
