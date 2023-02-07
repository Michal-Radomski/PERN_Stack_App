import axios from "axios";
import React from "react";

const Dashboard = (): JSX.Element => {
  React.useEffect(() => {
    const URL = "/api/dashboard/all-todos";
    axios
      .get(URL)
      .then((response) => {
        const dataToPass = response?.data;
        console.log("response.status:", response.status);
        console.log("dataToPass:", dataToPass);
      })
      .catch(function (error) {
        if (error) {
          console.log({ error });
        }
      });
  }, []);

  React.useEffect(() => {
    const URL = "/api/dashboard/list";
    axios
      .get(URL)
      .then((response) => {
        const dataToPass = response?.data;
        console.log("response.status:", response.status);
        console.log("dataToPass:", dataToPass);
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
    </React.Fragment>
  );
};

export default Dashboard;
