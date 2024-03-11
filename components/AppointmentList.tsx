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
}

const AppointmentList: React.FC<Props> = ({ appointments }) => {
  return (
    <Container.Columns className={{ dimension: "h-full", grid: "grid-cols-2" }}>
      {/* Render appointments */}
      {appointments.map(
        ({
          title,
          id,
          type,
          location,
          time,
          startTime,
          endTime,
          buyerName,
          vendorName,
        }) => (
          <Container.Flex
            key={id}
            className={{
              flex: "flex-col justify-center gap-y-2 my-10",
            }}
          >
            {/* <AppointmentForm
              initialFormData={{
                title,
                type,
                id,
                location,
                time,
                startTime,
                endTime,
                buyerName,
                vendorName,
              }}
            /> */}
            <Container>
              <Container.Flex className={{ flex: "justify-start gap-x-3" }}>
                <TextLayout.Title as="h3" title={title} />
                <Button>
                  <AppointmentActions className="h-5 w-5" />
                </Button>
              </Container.Flex>
              <TextLayout.Paragraph paragraph={time} />
            </Container>
            <Container className="w-10 border-b" />
            <Container className="italic">
              <TextLayout.Paragraph
                paragraph={`Type of appointment: ${type}`}
              />
              {type === "PHYSICAL" && (
                <TextLayout.Paragraph paragraph={`Location: ${location}`} />
              )}
            </Container>
            <Container className="w-10 border-b" />
            <Container className="font-bold">
              <TextLayout.Paragraph paragraph={`Vendor: ${vendorName}`} />
              <TextLayout.Paragraph paragraph={`Buyer: ${buyerName}`} />
            </Container>
          </Container.Flex>
        )
      )}
    </Container.Columns>
  );
};

export default AppointmentList;
