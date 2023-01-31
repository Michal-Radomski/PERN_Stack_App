import React from "react";
import axios from "axios";
import styled from "styled-components";
import Moment from "react-moment";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 58px;
`;

const url_api = process.env.REACT_APP_API_URL as string;
// console.log({ url_api });

const Footer = (): JSX.Element => {
  const [commitDate, setCommitDate] = React.useState<string>("");

  React.useEffect(() => {
    const fetchDate = async () => {
      await axios
        .get(url_api)
        .then((response) => {
          const dateToSend = response?.data[0]?.commit?.author?.date;
          // console.log({ dateToSend });
          setCommitDate(dateToSend);
        })
        .catch((error) => {
          console.log({ error });
        });
    };
    fetchDate();
  });

  return (
    <React.Fragment>
      <FooterContainer>
        <footer className="d-flex flex-wrap justify-content-center border-bottom bg-secondary text-white py-3">
          <div>
            Last Update: <span style={{ fontWeight: "bold" }}>{commitDate && <Moment fromNow>{commitDate}</Moment>}</span>
          </div>
        </footer>
      </FooterContainer>
    </React.Fragment>
  );
};

export default Footer;
