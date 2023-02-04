import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

import reactIcon from "../Icons/reactIcon.svg";

const ToastComponent = ({ message, color }: { message: string; color: string }): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  // console.log({ show });

  const toggleShow = () => setShow(!show);

  React.useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  return (
    <React.Fragment>
      <ToastContainer className="p-3" position={"middle-end"}>
        {message && (
          <Toast show={show} onClose={toggleShow} bg={color} delay={3000} autohide={true}>
            <Toast.Header>
              <img src={reactIcon} width={25} height={25} alt="React Icon" style={{ marginRight: "0.5rem" }} />
              <strong className="me-auto">PERN Stack App</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </React.Fragment>
  );
};

export default ToastComponent;
