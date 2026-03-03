import "./Button.css";

type Props = {
  children?: React.ReactNode;
  label?: string;
  onClick: () => void;
  isUpdate?: boolean;
  buscarTodos?: () => void;
  updatePessoa?: () => void;
  setisUpdate?: (value: boolean) => void;

};

const Button = (props: Props) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
      {props.label}
    </button>
  );
};

export default Button;