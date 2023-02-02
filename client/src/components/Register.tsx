import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { registerAction } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

const RegisterForm = styled.div`
  margin-top: 3rem;
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
  const [registerInputs, setRegisterInputs] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

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
      console.log("Passwords must be equal");
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
