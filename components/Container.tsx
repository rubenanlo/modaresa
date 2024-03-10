import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { turnObjectIntoString } from "helpers/manipulateText";

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
  let Component = as ?? "div";
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

Container.Section = function ContainerSection({
  children,
  className,
  as,
  bottomDiv,
  ...props
}: React.ComponentPropsWithoutRef) {
  let Component = as ?? "section";
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
        className?.flex === undefined && "flex-row justify-between items-center"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface ContainerLogoProps {
  src: string;
  alt: string;
  className?: Record<string, string | boolean>;
}

Container.Logo = function ContainerLogo({
  className,
  ...props
}: ContainerLogoProps) {
  const classNameProp = turnObjectIntoString(className);

  return (
    <Image
      className={clsx(classNameProp, "rounded-full")}
      src={props.src}
      alt={props.alt}
    />
  );
};

interface ContainerLinkProps {
  children?: React.ReactNode;
  text?: string;
  className?: {
    parent?: Record<string, string | boolean>;
    child?: Record<string, string | boolean>;
  };
  href: string;
  onClick?: () => void;
  Component?: React.ElementType;
  componentProps?: Record<string, any>;
}

Container.Link = function ContainerLink({
  children,
  text,
  className,
  href,
  onClick,
  Component,
  componentProps,
  ...props
}: ContainerLinkProps) {
  const classNameParent = turnObjectIntoString(className?.parent);
  const classNameChild = turnObjectIntoString(className?.child);

  return (
    <Link
      href={href}
      className={clsx(classNameParent, "cursor-pointer")}
      onClick={onClick}
      {...props}
    >
      {Component && (
        <Component
          className={clsx(classNameChild, "w-auto h-6 fill-zinc-500")}
          {...componentProps}
        />
      )}
      {text || children}
    </Link>
  );
};

interface ContainerListProps {
  as?: { parent?: React.ElementType; child?: React.ElementType };
  list: { id: string; [key: string]: any }[];
  className?: {
    parent?: Record<string, string | boolean>;
    child?: Record<string, string | boolean>;
  };
  AdditionalComponent?: React.ElementType;
}

Container.List = function ContainerList({
  as,
  list,
  className,
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
        <ChildComponent key={item.id} className={clsx(classNamePropChild)}>
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

interface ContainerTableProps {
  table: { th: string[]; tr: { td: string[] }[] };
  className?: {
    table: Record<string, string | boolean>;
    col: Record<string, string | boolean>;
    thead: Record<string, string | boolean>;
    tbody: Record<string, string | boolean>;
  };
}

Container.Table = function ContainerTable({
  table,
  className,
}: ContainerTableProps) {
  return (
    <table
      className={clsx(
        className.table,
        "max-w-sm mx-auto whitespace-nowrap mb-5"
      )}
    >
      <colgroup>
        {table.th.map((header, index) => (
          <col
            key={header}
            className={clsx(
              className.col,
              index === 0 ? className.col.first : className.col.rest
            )}
          />
        ))}
      </colgroup>
      <thead className={clsx(className.thead, "text-sm")}>
        <tr>
          {table.th.map((header) => (
            <th key={header} scope="col" className={clsx(className.th)}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={className.tbody}>
        {table.tr.map((row, index) => (
          <tr key={index}>
            {row.td.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
