import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { turnObjectIntoString } from "../helpers/manipulateText";

interface TextLayoutProps {
  className?: string;
  children: React.ReactNode;
}

interface TextLayoutTitleProps extends TextLayoutProps {
  as?: "h1" | "h2" | "h3" | "h4";
  title: string;
  AdditionalComponent?: React.ReactNode;
  props?: object;
}

interface TextLayoutSubtitleProps extends TextLayoutProps {
  as?: "h1" | "h2" | "h3" | "h4";
  subtitle: string;
}

interface TextLayoutParagraphProps extends TextLayoutProps {
  paragraph?: string;
}

interface TextLayoutTagProps {
  tag: string;
  className?: string;
}

interface TextLayoutNumberProps extends TextLayoutParagraphProps {
  number?: string;
  animations?: object;
}

const TextLayout: React.FC<TextLayoutProps> & {
  Title: React.FC<TextLayoutTitleProps>;
  Subtitle: React.FC<TextLayoutSubtitleProps>;
  Paragraph: React.FC<TextLayoutParagraphProps>;
  Tag: React.FC<TextLayoutTagProps>;
  Number: React.FC<TextLayoutNumberProps>;
} = ({ className, children }) => {
  const classNameProp = turnObjectIntoString(className);
  return <div className={clsx(classNameProp, "text-zinc-500")}>{children}</div>;
};

TextLayout.Title = ({
  as = "h1",
  title,
  AdditionalComponent,
  className,
  props,
}: TextLayoutTitleProps) => {
  const Component = as;
  const classNameProp = turnObjectIntoString(className);

  const variants = {
    h1: "text-4xl font-bold sm:text-5xl text-zinc-900",
    h2: "text-2xl sm:text-3xl text-zinc-900",
    h3: "text-xl sm:text-2xl text-zinc-900",
    h4: "text-sm font-semibold text-zinc-900",
  };

  return (
    <Component className={clsx(classNameProp, variants[as])} {...props}>
      {AdditionalComponent}
      {title}
    </Component>
  );
};

TextLayout.Subtitle = ({
  as = "h2",
  subtitle,
  className,
  ...props
}: TextLayoutSubtitleProps) => {
  const Component = as;
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component
      className={clsx(classNameProp, "text-2xl leading-8 ")}
      {...props}
    >
      {subtitle}
    </Component>
  );
};

TextLayout.Paragraph = ({
  paragraph,
  children,
  className,
  ...props
}: TextLayoutParagraphProps) => {
  const classNameProp = turnObjectIntoString(className);

  return (
    <p className={clsx(classNameProp, "text-zinc-600")} {...props}>
      {paragraph || children}
    </p>
  );
};

TextLayout.Tag = ({ tag, className }: TextLayoutTagProps) => {
  const classNameProp = turnObjectIntoString(className);
  return (
    <div className="bg-zinc-700 rounded-full h-fit w-fit px-3">
      <p className={clsx(classNameProp, " text-gray-300 text-xs")}>#{tag}</p>
    </div>
  );
};

TextLayout.Number = ({
  number,
  children,
  className,
  ...props
}: TextLayoutNumberProps) => {
  const classNameProp = turnObjectIntoString(className);

  return (
    <motion.p
      {...props.animations}
      className={clsx(classNameProp, "text-zinc-600 ")}
      {...props}
    >
      {number || children}
    </motion.p>
  );
};

export default TextLayout;
