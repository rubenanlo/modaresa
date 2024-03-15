import { AnimationVariants } from "./Interface";

export const text: AnimationVariants = {
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
};

export const characters: AnimationVariants = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: "-100%",
  },
};
