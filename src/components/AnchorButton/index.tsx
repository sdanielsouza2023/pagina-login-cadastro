import "./styles.css";

interface IProps {
  name: string;
}
export function AnchorButton(props: IProps) {
  return (
    <div className="cadastro-link">
      <span>
        
          <a href="#" className="">
            {props.name}
          </a>
        
      </span>
    </div>
  );
}
