import { useState } from "react";
import { AppointmentActions } from "./AppointmentActions";
import AppointmentForm from "./AppointmentForm";
import { Button } from "./Button";
import { Container } from "./Container";
import TextLayout from "./TextLayout";

interface Appointment {
  id: number;
  title: string;
  type: string;
  location?: string;
  time: string;
  buyerName: string;
  vendorName: string;
  startTime: string;
  endTime: string;
}

interface Props {
  appointments: Appointment[];
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: Appointment | null;
  setInitialData: React.Dispatch<React.SetStateAction<Appointment | null>>;
}

const AppointmentList: React.FC<Props> = ({
  appointments,
  isFormOpen,
  setIsFormOpen,
  initialData,
  setInitialData,
}) => {
  const handleUpdate = (appointment: Appointment) => {
    setInitialData(appointment);
    setIsFormOpen(true);
  };

  return (
    <Container.Columns className={{ dimension: "h-full", grid: "grid-cols-2" }}>
      {/* Render appointments */}
      {appointments.map((appointment) => (
        <Container.Flex
          key={appointment.id}
          className={{
            flex: "flex-col justify-center gap-y-2 my-10",
          }}
        >
          {isFormOpen && initialData && (
            <AppointmentForm
              initialFormData={initialData}
              setIsFormOpen={setIsFormOpen}
              setInitialData={setInitialData}
            />
          )}

          <Container>
            <Container.Flex className={{ flex: "justify-start gap-x-3" }}>
              <TextLayout.Title as="h3" title={appointment.title} />
              <Button onClick={() => handleUpdate(appointment)}>
                <AppointmentActions className="h-5 w-5" />
              </Button>
            </Container.Flex>
            <TextLayout.Paragraph paragraph={appointment.time} />
          </Container>
          <Container className="w-10 border-b" />
          <Container className="italic">
            <TextLayout.Paragraph
              paragraph={`Type of appointment: ${appointment.type}`}
            />
            {appointment.type === "PHYSICAL" && (
              <TextLayout.Paragraph
                paragraph={`Location: ${appointment.location}`}
              />
            )}
          </Container>
          <Container className="w-10 border-b" />
          <Container className="font-bold">
            <TextLayout.Paragraph
              paragraph={`Vendor: ${appointment.vendorName}`}
            />
            <TextLayout.Paragraph
              paragraph={`Buyer: ${appointment.buyerName}`}
            />
          </Container>
        </Container.Flex>
      ))}
    </Container.Columns>
  );
};

export default AppointmentList;
