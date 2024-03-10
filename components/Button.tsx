import Link from "next/link";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

interface ButtonProps {
  className?: Record<string, string | boolean>;
  text?: string;
  children?: React.ReactNode;
  href?: string;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  text,
  children,
  ...props
}: ButtonProps) => {
  const classNameProps = clsx(turnObjectIntoString(className));

  return typeof props.href === "undefined" ? (
    <button className={classNameProps} {...props}>
      {text || children}
    </button>
  ) : (
    <Link href={props.href}>
      <a className={classNameProps}>
        {children}
        {text}
      </a>
    </Link>
  );
};
