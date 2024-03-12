import { useState } from "react";
import { AppointmentActions, TrashCan } from "./AppointmentActions";
import AppointmentForm from "./AppointmentForm";
import { Button } from "./Button";
import { Container } from "./Container";
import TextLayout from "./TextLayout";
import DeleteModal from "./DeleteModal";

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
  onAppointmentAdded: () => void;
}

const AppointmentList: React.FC<Props> = ({
  appointments,
  isFormOpen,
  setIsFormOpen,
  initialData,
  setInitialData,
  onAppointmentAdded,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const handleUpdate = (appointment: Appointment) => {
    setInitialData(appointment);
    setIsFormOpen(true);
  };

  const handleOpenModal = (appointmentId: number) => {
    setAppointmentId(appointmentId);
    setOpenDeleteModal(true);
  };

  return (
    <Container.Columns className={{ dimension: "h-full", grid: "grid-cols-2" }}>
      {openDeleteModal && (
        <DeleteModal
          appointmentId={appointmentId}
          setOpenDeleteModal={setOpenDeleteModal}
          onAppointmentAdded={onAppointmentAdded}
        />
      )}

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
              <Button
                variant="callToAction"
                onClick={() => handleUpdate(appointment)}
              >
                <AppointmentActions className="h-5 w-5" />
              </Button>
              <Button
                variant="callToAction"
                onClick={() => handleOpenModal(appointment.id)}
              >
                <TrashCan className="h-5 w-5 text-red-500" />
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
              paragraph={`Buyer: ${appointment.buyerName} | ${appointment.companyName}`}
            />
          </Container>
        </Container.Flex>
      ))}
    </Container.Columns>
  );
};

export default AppointmentList;
