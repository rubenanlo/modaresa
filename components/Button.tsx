import Link from "next/link";
import clsx from "clsx";
import { turnObjectIntoString } from "../helpers/manipulateText";

interface ButtonProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
  href?: string;
  variant?: "primary" | "danger"; // Add type safety for variant
}

const variants = {
  primary: {
    dimension: "px-4 py-2",
    background: "bg-green-primary/60 hover:bg-green-primary/70",
    typography: "text-gray-900",
    rounded: "rounded-md",
  },
  secondary: {
    dimension: "px-4 py-2",
    background: "bg-blue-primary/60 hover:bg-blue-primary/70",
    typography: "text-white",
    rounded: "rounded-md",
  },
  danger: {
    background: "bg-red-primary hover:bg-red-primary/90",
    dimension: "px-4 py-2",
    typography: "text-white",
    rounded: "rounded-md",
  },
  callToAction: "",
  bold: {
    dimension: "w-52 h-52 px-16 shrink-0",
    background: "bg-green-primary",
    typography: "text-white",
    rounded: "rounded-full",
  },
};

export const Button: React.FC<ButtonProps> = ({
  className,
  text,
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const classNameProps = clsx(
    turnObjectIntoString(className),
    turnObjectIntoString(variants[variant])
  );

  const renderedContent = text ? text : children; // Ensure proper rendering of text or children

  return typeof props.href === "undefined" ? (
    <button className={classNameProps} {...props}>
      {renderedContent}
    </button>
  ) : (
    <Link href={props.href}>
      <a className={classNameProps}>{renderedContent}</a>
    </Link>
  );
};
