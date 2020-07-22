import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { saveAs } from "file-saver";
import CreateModal from "./CreateModal";
import User from "../classes/User";
import Card from "../utility/Card";
import { createCategoriesList } from "../../helperFunctions";
import AccountPanel from "./AccountPanel";
import Restaurant from "../classes/Restaurant";
import AccountContainer from "./AccountContainer";

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

const Panel = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
`;

const IconButton = styled.div`
  height: 3rem;
  width: 3rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: solid 1px ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 800px) {
    order: 4;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #f3f7f9;
  padding: 2rem 2rem;
  border-radius: 1rem;
  margin: -10px 0 5rem 0;
  > * {
    margin-top: 2rem;
  }
`;

const Label = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
  @media (max-width: 800px) {
    font-size: 2rem;
  }
`;

const Sort = styled.div`
  @media (max-width: 800px) {
    order: 3;
  }
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: 10rem;
  height: 3rem;
  font-size: 2rem;
  @media (max-width: 800px) {
    width: 5rem;
    height: 2rem;
    font-size: 1.6rem;
  }
`;

const Option = styled.option`
  height: 3rem;
  font-size: 3rem;
`;

const Settings = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: -10px 0 2rem 0;
  align-items: center;
  flex-wrap: wrap;
  > * {
    margin-top: 10px;
  }
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

const IconGroup = styled.div`
  display: flex;
  > * {
    cursor: pointer;
  }
  > a {
    &:not(:last-child) {
      margin-right: 1rem;
    }
    > i {
      font-size: 2.5rem;
      color: ${(props) => props.theme.colors.primary};
    }
  }
  > i {
    font-size: 2.5rem;
    color: ${(props) => props.theme.colors.primary};
    margin-right: 1rem;
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

export default function Dashboard() {
  //   const [active, setActive] = useState("view");
  //modal control
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [qr, setQr] = useState(null);

  //user information
  const auth = useSelector((state) => state.auth);

  //list of all items available
  const menu = useSelector((state) => state.menu.items);

  // list of selected items to display, default = all
  const displayItems = useSelector((state) => state.menu.display);

  //sort selector
  const onSortChange = (e) => {
    if (!sorted) {
      setSorted(true);
    }
    const sortSelection = e.target.value;
    if (sortSelection.length === 0) {
      dispatch({
        type: "CLEAR_SORTED",
      });
      setSorted(false);
    } else {
      const sorted = menu.filter(
        (item) =>
          item.category.trim().toLowerCase() ==
          sortSelection.trim().toLowerCase()
      );

      dispatch({
        type: "CHANGE_DISPLAY",
        payload: sorted,
      });
    }
  };

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

  //categories for select menu
  const categories = menu.length > 0 ? createCategoriesList(menu) : null;

  useEffect(() => {
    const user = new User(auth.id);
    user.getMenu().then((response) => {
      dispatch({
        type: "FETCH_MENU",
        payload: response.data,
      });
      dispatch({
        type: "CHANGE_DISPLAY",
        payload: response.data,
      });
    });
  }, []);

  return (
    <AccountContainer
    // qr={qr}
    // auth={auth}
    // onQrClick={onQrClick}
    // onPdfClick={onPdfClick}
    >
      <CreateModal
        categories={categories && categories}
        open={open}
        setOpen={setOpen}
        auth={auth}
      ></CreateModal>
      <Panel>
        <Settings>
          <Sort>
            <Label>Sort by category: </Label>
            <Select onChange={onSortChange} type="select">
              {sorted ? <Option value="">View all</Option> : null}
              {categories &&
                categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              <Option value="" selected disabled hidden></Option>
            </Select>
          </Sort>
          <IconButton onClick={() => setOpen(!open)}>+</IconButton>
          <IconGroup>
            <a href={`/restaurant/${auth.id}`} target="_blank">
              <i className="fas fa-table"></i>
            </a>
            <i onClick={onQrClick} className="fas fa-qrcode"></i>
            <i onClick={onPdfClick} className="far fa-file-pdf"></i>
          </IconGroup>
        </Settings>

        {displayItems ? (
          <CardContainer>
            {displayItems.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))}
          </CardContainer>
        ) : null}
      </Panel>
    </AccountContainer>
    // <Container>
    //   <a
    //     id="download"
    //     style={{ display: "none" }}
    //     download="qr"
    //     href={qr ? qr : null}
    //     alt="Invisible download button"
    //   ></a>
    //   <CreateModal
    //     categories={categories && categories}
    //     open={open}
    //     setOpen={setOpen}
    //     auth={auth}
    //   ></CreateModal>
    //   <Title>{auth.restaurant}</Title>
    //   <Grid>

    //     {/* <Nav>
    //       <ResponsiveA href={`/restaurant/${auth.id}`} target="_blank">
    //         <ResponsiveBtn>
    //           <i className="fas fa-table"></i>
    //           <p>Go To Customer Menu</p>
    //         </ResponsiveBtn>
    //       </ResponsiveA>
    //       <ResponsiveBtn onClick={onQrClick}>
    //         <i className="fas fa-qrcode"></i>
    //         <p>Download QR Code</p>
    //       </ResponsiveBtn>
    //       <ResponsiveBtn onClick={onPdfClick}>
    //         <i className="far fa-file-pdf"></i>
    //         <p>
    //           Download Displayable PDF
    //         </p>
    //       </ResponsiveBtn>
    //     </Nav> */}
    //     <Panel>
    //       <Settings>
    //         <Sort>
    //           <Label>Sort by category: </Label>
    //           <Select onChange={onSortChange} type="select">
    //             {sorted ? <Option value="">View all</Option> : null}
    //             {categories &&
    //               categories.map((category, index) => (
    //                 <Option key={index} value={category}>
    //                   {category}
    //                 </Option>
    //               ))}
    //             <Option value="" selected disabled hidden></Option>
    //           </Select>
    //         </Sort>
    //         <IconButton onClick={() => setOpen(!open)}>+</IconButton>
    //         <IconGroup>
    //           <a href={`/restaurant/${auth.id}`} target="_blank">
    //             <i className="fas fa-table"></i>
    //           </a>
    //           <i onClick={onQrClick} className="fas fa-qrcode"></i>
    //           <i onClick={onPdfClick} className="far fa-file-pdf"></i>
    //         </IconGroup>
    //       </Settings>

    //       {displayItems ? (
    //         <CardContainer>
    //           {displayItems.map((item) => (
    //             <Card
    //               key={item.id}
    //               id={item.id}
    //               imageUrl={item.imageUrl}
    //               name={item.name}
    //               description={item.description}
    //               price={item.price}
    //             />
    //           ))}
    //         </CardContainer>
    //       ) : null}
    //     </Panel>
    //   </Grid>
    // </Container>
  );
}
