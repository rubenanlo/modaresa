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
  state: State;
}

const AppointmentList: React.FC<ListProps> = ({ appointments, state }) => {
  const { isFormOpen, setIsFormOpen } = state;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState(null);

  // TODO: To improve the way we rely on the data structure and avoid manipulating the data so many times
  const handleUpdate = async (appointment: Appointment) => {
    const refinedAppointment = {
      vendorName: appointment.vendorName,
      buyerName: appointment.buyerName,
      companyName: appointment.companyName,
      appointmentData: {
        id: appointment.id,
        title: appointment.title,
        type: appointment.type,
        location: appointment.location,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
      },
    };

    setInitialData(refinedAppointment); // to populate the data in the appointment form
    setIsFormOpen(true); // to open modal with the appointment form
  };

  const handleOpenModal = (appointmentId: number) => {
    setAppointmentId(appointmentId); // to set the appointment id to be deleted
    setOpenDeleteModal(true); // to open a modal to either delete the appointment or cancel
  };

  return (
    <Container.Columns
      className={{
        dimension: "h-full",
        grid: "grid-cols-1 pl-10 sm-pl-0 sm:grid-cols-2",
      }}
    >
      {/* Modals: */}
      {openDeleteModal && (
        <DeleteModal
          appointmentId={appointmentId}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {isFormOpen && initialData && (
        <AppointmentForm
          initialFormData={initialData}
          setIsFormOpen={setIsFormOpen}
          setInitialData={setInitialData}
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
