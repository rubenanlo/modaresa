import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { turnObjectIntoString } from "../helpers/manipulateText";

interface ContainerProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: Record<string, string | boolean>;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  as,
  className,
  ...props
}: ContainerProps) => {
  const Component = as ?? "div";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component className={clsx(classNameProp)} {...props}>
      {children}
    </Component>
  );
};

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: Record<string, string | boolean>;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  ...props
}: AnimatedContainerProps) => {
  const classNameProps = turnObjectIntoString(className);

  return (
    <motion.div {...props} className={clsx(classNameProps)}>
      {children}
    </motion.div>
  );
};

interface ContainerSectionProps extends ContainerProps {
  bottomDiv?: boolean;
}

Container.Section = function ContainerSection({
  children,
  className,
  as,
  bottomDiv,
  ...props
}: ContainerSectionProps) {
  const Component = as ?? "section";
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component
      className={clsx(
        classNameProp,
        bottomDiv ? "pb-14" : "pb-24 sm:pb-32",
        "relative isolate mx-auto max-w-4xl desktop-sm:max-w-5xl px-6 pt-10 lg:px-8"
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

interface ContainerColumnsProps extends ContainerProps {}

Container.Columns = function ContainerColumns({
  children,
  className,
  ...props
}: ContainerColumnsProps) {
  const classNameProp = turnObjectIntoString(className);
  return (
    <div className={clsx(classNameProp, "grid")} {...props}>
      {children}
    </div>
  );
};

interface ContainerFlexProps extends ContainerProps {}

Container.Flex = function ContainerFlexProps({
  children,
  className,
  ...props
}: ContainerFlexProps) {
  const classNameProp = turnObjectIntoString(className);
  return (
    <div
      className={clsx(
        classNameProp,
        "flex",
        className?.flex === undefined &&
          "flex-row justify-between items-center flex-wrap"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface ContainerListProps {
  as?: { parent?: React.ElementType; child?: React.ElementType };
  list: { id: string; [key: string]: string }[];
  className?: {
    parent?: Record<string, string | boolean>;
    child?: Record<string, string | boolean>;
  };
  AdditionalComponent?: React.ElementType;
  currentBasis?: string;
}

Container.List = function ContainerList({
  as,
  list,
  className,
  currentBasis,
  AdditionalComponent,
}: ContainerListProps) {
  const ParentComponent = as?.parent ?? "ul";
  const classNamePropParent = turnObjectIntoString(className?.parent);

  const ChildComponent = as?.child ?? "li";
  const classNamePropChild = turnObjectIntoString(className?.child);

  return (
    <ParentComponent
      role="list"
      className={clsx(classNamePropParent, "leading-6")}
    >
      {list.map((item) => (
        <ChildComponent
          key={item.id || item.name}
          className={clsx(
            classNamePropChild,
            currentBasis === item.href && "bg-blue-primary text-white"
          )}
        >
          {AdditionalComponent ? (
            <AdditionalComponent
              href={item.href || ""}
              target={item.target || ""}
              className="flex gap-x-2"
            >
              {<item.icon className="h-6 w-6 shrink-0" /> || null}
              <p>{item.name || ""}</p>
            </AdditionalComponent>
          ) : (
            item
          )}
        </ChildComponent>
      ))}
    </ParentComponent>
  );
};

interface ContainerImageProps {
  src: string;
  alt: string;
  className?: Record<string, string | boolean>;
}

Container.Image = function ContainerImage({
  src,
  alt,
  className,
  ...props
}: ContainerImageProps) {
  const classNameProp = turnObjectIntoString(className);

  return (
    <Image className={clsx(classNameProp)} src={src} alt={alt} {...props} />
  );
};
