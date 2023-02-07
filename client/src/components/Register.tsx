import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { changeMessage, registerAction } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const RegisterForm = styled.div`
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

const Register = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authMessage]: [string] = useAppSelector((state: RootState) => [state?.auth?.authStatus?.message]);
  // console.log("authMessage;", authMessage);

  const [registerInputs, setRegisterInputs] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  React.useEffect(() => {
    if (authMessage === "User registered") {
      const postRegisterAction = async () => {
        // await alert("You will be redirected to Login Page");
        setTimeout(() => {
          dispatch(changeMessage("You are redirected to Login Page, please Login", "primary"));
        }, 4000);
        await navigate("/login");
      };
      setTimeout(() => {
        postRegisterAction();
      }, 500);
    }
  }, [authMessage, dispatch, navigate]);

  const { name, email, password, passwordConfirm } = registerInputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log({ name, value });
    setRegisterInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user: User = { name, email, password, passwordConfirm };
    if (password !== passwordConfirm) {
      // console.log("Passwords must be equal");
      await dispatch(changeMessage("Passwords must be equal", "warning"));
      return;
    }
    // console.log({ user });
    await dispatch(registerAction(user));
  };

  return (
    <React.Fragment>
      <RegisterForm>
        <h1 className="mt-5 text-center">Register</h1>
        <form onSubmit={onSubmitForm}>
          <input
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
            minLength={3}
            required={true}
          />
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
          <input
            placeholder="confirm password"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
            minLength={8}
            required={true}
          />
          <button className="btn btn-primary" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
        <Link to="/login" style={{ width: "100%", textDecoration: "none" }}>
          Login
        </Link>
      </RegisterForm>
    </React.Fragment>
  );
};

export default Register;
