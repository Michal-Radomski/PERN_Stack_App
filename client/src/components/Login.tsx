import React from "react";
import styled from "styled-components";

const LoginForm = styled.div`
  margin-top: 2rem;
  width: 600px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Login = (): JSX.Element => {
  const [loginInputs, setLoginInputs] = React.useState<User>({
    email: "",
    password: "",
  });

  const { email, password } = loginInputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const onSubmitForm = async (event: React.SyntheticEvent) => {};

  return (
    <React.Fragment>
      <LoginForm>
        <h1 className="mt-5 text-center">Login</h1>
        <form onSubmit={onSubmitForm}>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
          />
          <button className="btn btn-success" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
      </LoginForm>

      {/* <Link to="/register">Register</Link> */}
    </React.Fragment>
  );
};

export default Login;
