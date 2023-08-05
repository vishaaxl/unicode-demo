import { Field, useField } from "formik";
import { ReactNode } from "react";

interface InputProps {
  placeholder?: string;
  type: string;
  label?: string;
  name: string;
  required?: boolean;
  children?: ReactNode;
  component?: string;
  customonchange?: Function;
  customRegex?: RegExp;
  value?: string;
  labelColor?: string;
}

export default function CustomInput({
  placeholder,
  label,
  type,
  name,
  required,
  children,
  component,
  customRegex,
  customonchange,
  value,
  labelColor,
}: InputProps) {
  const [field, meta] = useField(name);
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className={`font-regular mb-2 ${
            labelColor ? labelColor : "text-[#2c2a29]"
          }`}
        >
          {label}
          {required && <span className="text-red-600 ml-1 text-xs">*</span>}
        </label>
      )}
      <Field
        id={name}
        component={component}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || field.value}
        onChange={(e: any) => {
          const { value } = e.target;

          const regex = customRegex ? customRegex : /./;

          // check current value with regex
          if (!value || regex.test(value.toString().replaceAll(",", ""))) {
            if (customonchange) {
              customonchange(e);
            }

            field.onChange(e);
          }
        }}
        className={`border-[#2c2a2955] rounded-md border-[1.5px] outline-none text-sm p-3`}
      >
        {children}
      </Field>
      {meta.error && meta.touched && (
        <div className="text-red-600 capitalize text-xs pt-2">{meta.error}</div>
      )}
    </div>
  );
}
