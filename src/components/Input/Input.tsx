import "./Input.css";

type Props = {
  label?: string;
  type?: string;
  name: string;
  step?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <div className="input-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}

        name={props.name}
        type={props.type ?? "text"}
        step={props.step ?? undefined}
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};


export default Input;