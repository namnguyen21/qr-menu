import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import User from "../classes/User";
import Restaurant from "../classes/Restaurant";

const Container = styled.div`
  min-height: 70vh;
  margin: auto;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem 5rem;
  @media (max-width: 800px) {
    padding: 1rem;
  }
`;
const Title = styled.h2`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.black};
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  /* @media (min-width: 800px) { */
  display: flex;
  flex-direction: row;
  /* } */
  /* @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  } */
`;

const ResponsiveBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.grey};
  cursor: pointer;
  > p {
    font-size: 2rem;
  }
  > i {
    font-size: 2rem;
    margin-right: 1rem;
  }
`;

const ResponsiveA = styled.a`
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
`;

const Nav = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5rem 0;
  margin-right: 3rem;
  > * {
    padding: 1rem 0;
    &:hover {
      background-color: #f3f7f9;
    }
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function AccountNav({ children }) {
  const [qr, setQr] = useState(null);

  const auth = useSelector((state) => state.auth);

  const onQrClick = () => {
    const restaurant = new Restaurant(auth.id);
    restaurant.getQR().then((response) => {
      const imageFile = response.data;
      setQr(imageFile);
      document.querySelector("#download").click();
    });
  };

  const onPdfClick = () => {
    const newUser = new User(auth.id);
    newUser.getPdf().then((response) => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "qr.pdf");
    });
  };
  return (
    <Container>
      <a
        id="download"
        style={{ display: "none" }}
        download="qr"
        href={qr ? qr : null}
        alt="Invisible download button"
      ></a>
      <Title>{auth.restaurant}</Title>
      <Grid>
        <Nav>
          <ResponsiveA href={`/restaurant/${auth.id}`} target="_blank">
            <ResponsiveBtn>
              <i className="fas fa-table"></i>
              <p>Go To Customer Menu</p>
            </ResponsiveBtn>
          </ResponsiveA>
          <ResponsiveBtn onClick={onQrClick}>
            <i className="fas fa-qrcode"></i>
            <p>Download QR Code</p>
          </ResponsiveBtn>
          <ResponsiveBtn onClick={onPdfClick}>
            <i className="far fa-file-pdf"></i>
            <p>Download Displayable PDF</p>
          </ResponsiveBtn>
          <StyledLink to="/users/upload/csv">
            <ResponsiveBtn>
              <i className="fas fa-file-csv"></i>Bulk Upload Using .CSV File
            </ResponsiveBtn>
          </StyledLink>
        </Nav>
        {children}
      </Grid>
    </Container>
  );
}
