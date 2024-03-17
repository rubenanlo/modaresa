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
              className={turnObjectIntoString(className)}
            >
              {item.input}
            </label>
          )}
          {item.InBetweenComponent}
          <div className={turnObjectIntoString(className)}>
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
              className={turnObjectIntoString(className)}
              onChange={item.onChange}
              {...props} // Spread the rest of the input props
            />
          </div>
        </div>
      ))}
    </>
  );
};

// Interface for the FormCheckboxProps
interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  text?: string;
}

// The FormCheckbox component
Form.Checkbox = function FormCheckbox({
  field,
  text,
  ...props
}: FormCheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        id={field}
        name={field}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        {...props}
      />
      <label
        htmlFor={field}
        className="ml-3 block text-sm leading-6 text-zinc-500 dark:text-orange-tertiary"
      >
        {text}
      </label>
    </div>
  );
};
