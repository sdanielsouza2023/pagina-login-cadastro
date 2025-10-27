import type { ChangeEventHandler } from "react";
import "./styles.css";

interface IProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  name: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export function Input(props: IProps) {
  return (
    <label className="input-label">
      {props.label}{" "}
      <input
        className="default-input"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </label>
  );
}
