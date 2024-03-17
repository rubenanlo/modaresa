import React, { ReactNode, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { turnObjectIntoString } from "../helpers/manipulateText";

interface FormProps {
  as?: React.ElementType;
  className?: string | object;
  children?: ReactNode;
  [key: string]: number; // To accept other props dynamically
}

export function Form({
  as: Component = "form",
  className,
  children,
  ...props
}: FormProps) {
  const classNameProp = turnObjectIntoString(className);

  return (
    <Component className={clsx(classNameProp, "space-y-6")} {...props}>
      {children}
    </Component>
  );
}

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  variant?: "primary";
  placeholder?: string;
}

Form.Field = function FormField({
  className,
  section,
  ...props
}: FormFieldProps) {
  return section.map((item) => (
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
  ));
};

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  text?: string;
}

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
