import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { loginAction, changeMessage } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const LoginForm = styled.div`
  margin-top: 4rem;
  width: 300px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  form {
    width: 100%;
  }
`;

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useAppDispatch();
  const [authStatus]: [boolean] = useAppSelector((state: RootState) => [state?.auth?.authStatus?.auth]);
  // console.log("authStatus;", authStatus);

  const [loginInputs, setLoginInputs] = React.useState<User>({
    email: "",
    password: "",
  });

  const { email, password } = loginInputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log({ name, value });
    setLoginInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user: User = { email, password };
    // console.log({ user });
    // alert(`${email} ${password}`);
    await dispatch(changeMessage(""));
    await dispatch(loginAction(user));
  };

  React.useEffect(() => {
    if (authStatus) {
      navigate("/dashboard");
    }
  }, [authStatus, navigate]);

  return (
    <React.Fragment>
      <LoginForm>
        <h1 className="mt-5 text-center">Login</h1>
        <form onSubmit={onSubmitForm}>
          <input
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
            minLength={6}
            required={true}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
            minLength={8}
            required={true}
          />
          <button className="btn btn-success" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
        <Link to="/register" style={{ width: "100%", textDecoration: "none" }}>
          Register
        </Link>
      </LoginForm>
    </React.Fragment>
  );
};

export default Login;
