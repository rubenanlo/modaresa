import { Container } from "./Container";
import TextLayout from "./TextLayout";

interface NextAppointment {
  title: string;
  type: string;
  location?: string;
  startTime: string;
  endTime: string;
  vendorName: string;
  buyerName: string;
}

interface UpNextProps {
  nextAppointment: NextAppointment;
}

const UpNext: React.FC<UpNextProps> = ({ nextAppointment }: UpNextProps) => {
  return (
    <Container.Flex
      className={{ dimension: "h-52", flex: "flex-col justify-center gap-y-2" }}
    >
      <Container>
        <TextLayout.Title as="h3" title={nextAppointment.title} />
        <TextLayout.Paragraph paragraph={nextAppointment.time} />
      </Container>
      <Container className="w-10 border-b" />
      <Container className="italic">
        <TextLayout.Paragraph
          paragraph={`Type of appointment: ${nextAppointment.type}`}
        />
        {nextAppointment.type === "PHYSICAL" && (
          <TextLayout.Paragraph
            paragraph={`Location: ${nextAppointment.location}`}
          />
        )}
      </Container>
      <Container className="w-10 border-b" />
      <Container className="font-bold">
        <TextLayout.Paragraph
          paragraph={`Vendor: ${nextAppointment.vendorName}`}
        />
        <TextLayout.Paragraph
          paragraph={`Buyer: ${nextAppointment.buyerName}`}
        />
      </Container>
    </Container.Flex>
  );
};

export default UpNext;
