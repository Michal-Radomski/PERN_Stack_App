import React from "react";
import { useNavigate } from "react-router-dom";

import { changeMessage, logoutAction } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

const AutoLogout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const userEvents = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"] as string[];

  let timer: NodeJS.Timeout;

  const resetTimer = (): void => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleTimer = (): void => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(userEvents).forEach((item: string) => {
        window.removeEventListener(item, resetTimer);
      });
      autoLogout();
    }, 1000 * 60 * 10);
  };

  React.useEffect(() => {
    Object.values(userEvents).forEach((item: string) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleTimer();
      });
    });
    return () => {
      if (timer) {
        // console.log({ timer });
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoLogout = async () => {
    await dispatch(changeMessage("You will logout after 5s", "info"));
    await setTimeout(async () => {
      await dispatch(logoutAction());
      await navigate("/");
    }, 5000);
  };
  return children;
};

export default AutoLogout;
