type ButtonProps = {
  text: string;
  theme: ITheme;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  handleClick?: () => void;
};

export enum ITheme {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

const Button = ({ text, theme, disabled, handleClick }: ButtonProps) => {
  const onclick = () => {
    console.log("Button clicked");
    handleClick && handleClick();
  };

  return (
    <button
      className={`button ${disabled ? "disabled" : theme}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
