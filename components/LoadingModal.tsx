import React from "react";
import { Container, AnimatedContainer } from "./Container"; // Ensure these are TypeScript compatible
import { text, characters } from "../library/animations"; // Ensure these exports are TypeScript compatible
import TextLayout from "./TextLayout"; // Ensure this is TypeScript compatible

const LoadingModal: React.FC = () => {
  const textStr = "Generating, the, list, of, appointments";
  const textArr = textStr.split(",");
  return (
    <AnimatedContainer initial="hidden" animate="visible" variants={text}>
      <Container.Flex
        className={{
          flex: "flex-col justify-center items-start gap-y-2",
          dimension: "h-[70vh]",
        }}
      >
        {textArr.map((letter, index) => (
          <AnimatedContainer key={index} variants={characters}>
            <TextLayout.Paragraph
              paragraph={letter.trim()}
              className={{
                typography: "text-5xl",
              }}
            />
          </AnimatedContainer>
        ))}
      </Container.Flex>
    </AnimatedContainer>
  );
};

export default LoadingModal;
