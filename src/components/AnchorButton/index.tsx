import "./styles.css";

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
}
export function AnchorButton({ name, ...props }: IProps) {
  return (
    <div>
      <span>
        <a href="#" {...props}>
          {name}
        </a>
      </span>
    </div>
  );
}
