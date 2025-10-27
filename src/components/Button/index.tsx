import "./styles.css";

interface IProps {
  label: string;
  type: "button" | "submit" | "reset";
}

export function Button(props: IProps) {
  return (
    <button className="default-button" type={props.type}>
      {props.label}
    </button>
  );
}
