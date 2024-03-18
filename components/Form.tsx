import React, { ReactNode, InputHTMLAttributes, ElementType } from "react";
import clsx from "clsx";
import { turnObjectIntoString } from "../helpers/manipulateText";

interface FormProps {
  as?: ElementType;
  className?: Record<string, string | boolean>;
  children?: ReactNode;
}

// The Form component with typed props
export const Form: React.FC<FormProps> & {
  Field: React.FC<FormFieldProps>;
  Checkbox: React.FC<FormCheckboxProps>;
} = ({ as: Component = "form", className, children, ...props }) => {
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component className={clsx(classNameProp, "space-y-6")} {...props}>
      {children}
    </Component>
  );
};

// Define an interface for the items in the section array
interface SectionItem {
  input: string;
  type: string;
  name?: string;
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  value?: string;
  current?: boolean;
  showLabel?: boolean;
  InBetweenComponent?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
  // Add more properties as needed
}

// Update the FormFieldProps interface to use the SectionItem interface for the section array
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  variant?: "primary";
  placeholder?: string;
  section: SectionItem[]; // Use the SectionItem interface for elements of the section array
}

// The FormField component
Form.Field = function FormField({
  className,
  section,
  ...props
}: FormFieldProps) {
  return (
    <>
      {section.map((item) => (
        <div
          key={item.input}
          className={clsx(
            item.type === "radio" ? "relative flex flex-row-reverse" : ""
          )}
        >
          {item.showLabel && (
            <label
              htmlFor={item.placeholder}
              className={turnObjectIntoString(className.label)}
            >
              {item.input}
            </label>
          )}
          {item.InBetweenComponent}
          <div className={turnObjectIntoString(className.input.container)}>
            <input
              ref={item.ref}
              type={item.type}
              name={item.name || item.input}
              id={item.input}
              required={item.required || false}
              autoComplete={item.autocomplete}
              placeholder={item.placeholder}
              value={item.value}
              checked={item.current}
              className={turnObjectIntoString(className.input.inputField)}
              onChange={item.onChange}
              {...props} // Spread the rest of the input props
            />
          </div>
        </div>
      ))}
    </>
  );
};
