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
  // useEffect(() => {
  //     let timer: number | undefined;
  //     if (show && show !== undefined) {
  //         timer = setTimeout(() => {
  //             // handleClose && handleClose();
  //         }, 3000);
  //     }
  //     return () => {
  //         clearTimeout(timer);
  //     }

  // }, [show]);

  // const handleClick = () => {
  //     console.log('click', text, type);
  //     handleClose && handleClose();
  // }

  return (
    <div>
      <div className={`message ${type} message-appear`}>
        {text}
      </div>
      {/* <div className={`message ${type} ${showButton ? 'visible' : ''} message-appear`}>{text}</div> */}
      {showButton &&
        <Button
          text="Close"
          theme={ITheme.PRIMARY}
          handleClick={handleClose}
        />}
    </div>
  );
};
