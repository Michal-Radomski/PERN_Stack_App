import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

import reduxIcon from "../Icons/reduxIcon.svg";
import { timestampToString } from "../utils/helpers";

const ToastComponent = ({ message, color, distance }: { message: string; color: string; distance: string }): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  // console.log({ color });

  const toggleShow = () => setShow(!show);

  React.useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  return (
    <React.Fragment>
      <ToastContainer className="p-3" position={"top-end"} style={{ marginTop: distance }}>
        {message && (
          <Toast show={show} onClose={toggleShow} bg={color} delay={4000} autohide={true}>
            <Toast.Header>
              <img src={reduxIcon} width={25} height={25} alt="Redux Icon" style={{ marginRight: "0.5rem" }} />
              <strong className="me-auto">PERN Stack App</strong>
              <small>{timestampToString(Date.now() / 1000)}</small>
            </Toast.Header>
            <Toast.Body>
              <h5>{message}</h5>
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </React.Fragment>
  );
};

export default ToastComponent;
