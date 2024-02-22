import Button, { ITheme } from "./Button";

export type MessageProps = {
  text: string;
  type: MessageType;
  showButton?: boolean;
  handleClose?: () => void;
};

export enum MessageType {
  SUCCES = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info"
}

export const Message = ({
  text,
  type,
  handleClose,
  showButton
}: MessageProps) => {
  return (
    <div>
      <div className={`message ${type} message-appear`}>
        {text}
      </div>
      {showButton &&
        <Button
          text="Close"
          theme={ITheme.PRIMARY}
          handleClick={handleClose}
        />}
    </div>
  );
};
