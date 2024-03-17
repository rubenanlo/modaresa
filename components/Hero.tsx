import { FC } from "react";
import TextLayout from "./TextLayout";
import { Container } from "./Container";

const Hero: FC = () => {
  return (
    <Container className={" bg-blue-secondary px-10 py-10"}>
      <TextLayout.Title as="h1" title="Your Appointments!" />
      <TextLayout.Paragraph
        paragraph="Welcome to your appointments dashboard. Here you can see your upcoming appointments and schedule new ones."
        className="mt-5"
      />
    </Container>
  );
};

export default Hero;
