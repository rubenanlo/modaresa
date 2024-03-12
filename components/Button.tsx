import Link from "next/link";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

interface ButtonProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
  href?: string;
  variant?: "primary" | "danger"; // Add type safety for variant
  [key: string]: any;
}

const variants = {
  primary: "bg-green-primary/60 text-gray-900 hover:bg-green-primary/70",
  danger: "bg-red-primary text-white hover:bg-red-primary/90",
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
    "px-4 py-2 rounded-md",
    variants[variant]
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
