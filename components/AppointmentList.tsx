import { useState } from "react";
import { AppointmentActions, TrashCan } from "./AppointmentActions";
import AppointmentForm from "./AppointmentForm";
import { Button } from "./Button";
import { Container } from "./Container";
import TextLayout from "./TextLayout";
import DeleteModal from "./DeleteModal";
import { Appointment, State } from "../library/Interface";

interface ListProps {
  appointments: Appointment[];
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: State;
}

const AppointmentList: React.FC<ListProps> = ({
  appointments,
  state: { isFormOpen, setIsFormOpen },
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState(null);

  const handleUpdate = (appointment: Appointment) => {
    setInitialData(appointment); // to populate the data in the appointment form
    setIsFormOpen(true); // to open modal with the appointment form
  };

  const handleOpenModal = (appointmentId: number) => {
    setAppointmentId(appointmentId); // to set the appointment id to be deleted
    setOpenDeleteModal(true); // to open a modal to either delete the appointment or cancel
  };

  return (
    <Container.Columns className={{ dimension: "h-full", grid: "grid-cols-2" }}>
      {/* Modals: */}
      {openDeleteModal && (
        <DeleteModal
          appointmentId={appointmentId}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {/* Render appointments */}
      {appointments?.map((appointment) => (
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
