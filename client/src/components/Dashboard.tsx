import axios from "axios";
import React from "react";

const Dashboard = (): JSX.Element => {
  const [privateState, setPrivateState] = React.useState<string>("");

  React.useEffect(() => {
    const URL = "/api/dashboard";
    axios
      .get(URL)
      .then((response) => {
        const dataToPass = response?.data;
        // console.log("response.status:", response.status);
        // console.log("dataToPass:", dataToPass);
        if (response.status === 200) {
          setPrivateState(dataToPass.message);
        }
      })
      .catch(function (error) {
        if (error) {
          console.log({ error });
        }
      });
  }, []);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>Welcome to the Dashboard of the PERN Stack Auth App</h1>
      <h3 style={{ textAlign: "center" }}>
        message: <span style={{ fontWeight: "bold" }}>{privateState}</span>
      </h3>
    </React.Fragment>
  );
};

export default Dashboard;
