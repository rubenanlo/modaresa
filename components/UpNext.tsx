import { Container } from "./Container";
import TextLayout from "./TextLayout";

interface UpNextProps {
  nextAppointment: {
    title: string;
    type: string;
    location?: string;
    startTime: string;
    endTime: string;
  };
}

const UpNext: React.FC<UpNextProps> = ({ nextAppointment }: UpNextProps) => {
  return (
    <Container className="mt-10">
      <TextLayout.Title as="h3" title={nextAppointment?.title} />
      <TextLayout.Paragraph paragraph={nextAppointment?.time} />
      <Container className="w-10 border-b my-2" />
      <Container className="italic">
        <TextLayout.Paragraph
          paragraph={`Type of appointment: ${nextAppointment?.type}`}
          className="mt-2"
        />
        {nextAppointment?.type === "PHYSICAL" && (
          <TextLayout.Paragraph
            paragraph={`Location: ${nextAppointment?.location}`}
          />
        )}
      </Container>
    </Container>
  );
};

export default UpNext;
