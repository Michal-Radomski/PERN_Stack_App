import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const NotFound = (): JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <h1 style={{ textAlign: "center", marginTop: "120px" }}>404, Page Not Found</h1>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
