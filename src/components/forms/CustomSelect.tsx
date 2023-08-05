import { useField } from "formik";
import Select, { components } from "react-select";

interface SelectProps {
  label?: string;
  name: string;
  required?: boolean;
  options: any[];
  isMulti?: boolean;
  labelColor?: string;
}

// this one overrides the default styles
const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        ...props.innerProps,
        onMouseOver: (e: any) => {
          e.target.style.background = "#db2777";
          e.target.style.color = "#f4f4f4";
        },
        onMouseOut: (e: any) => {
          e.target.style.background = "#db2777";
          e.target.style.color = "#f4f4f4";
        },
      }}
    />
  );
};

export default function CustomSelect({
  label,
  name,
  required,
  options,
  isMulti,
  labelColor,
}: SelectProps) {
  const [field, , helpers] = useField(name);

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
      <Select
        id={name}
        options={options}
        onChange={(value: any) => helpers.setValue(value)}
        isMulti={isMulti}
        value={field.value}
        components={{
          MultiValueRemove,
        }}
        className="my-react-select"
        styles={{
          control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            padding: ".3125rem",
            borderColor: "#2c2a2955",
            borderWidth: "2px",
          }),
          multiValue: (base: any, state: any) => ({
            ...base,
            backgroundColor: "#db2777",
            color: "#f4f4f4", // Change text color
            padding: "0 0.5125rem",
          }),
          multiValueLabel: (base: any, state: any) => ({
            ...base,
            color: "#f4f4f4", // Change text color
          }),
        }}
      />
    </div>
  );
}
