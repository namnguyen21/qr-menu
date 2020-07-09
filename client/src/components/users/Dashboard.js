import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditModal from "./EditModal";
import User from "../classes/User";
import Card from "../utility/Card";
import Button from "../utility/Button";
import { createCategoriesList } from "../../helperFunctions";
import AccountPanel from "./AccountPanel";
import Restaurant from "../classes/Restaurant";

const Container = styled.div`
  min-height: 70vh;
  margin: auto;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem 5rem;
`;
const Title = styled.h2`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.black};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 30% auto;
  }
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
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
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #f3f7f9;
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin: -10px 0 0 0;
  > * {
    margin-top: 10px;
  }
`;

const Label = styled.span`
  font-size: 2rem;
`;

const Sort = styled.div`
  margin-right: 2rem;
`;

const Select = styled.select`
  width: 10rem;
  height: 3rem;
  font-size: 1.6rem;
`;

const Option = styled.option`
  height: 3rem;
  font-size: 3rem;
`;

const Settings = styled.div`
  display: flex;
  justify-content: center;
  margin: -10px 0 2rem 0;
  align-items: center;
  flex-wrap: wrap;
  > * {
    margin-top: 10px;
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

  //categories for select menu
  const categories = menu && createCategoriesList(menu);

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
    <Container>
      <a
        id="download"
        style={{ display: "none" }}
        download="qr"
        href={qr ? qr : null}
      ></a>
      <EditModal
        categories={categories && categories}
        open={open}
        setOpen={setOpen}
      ></EditModal>
      <Title>{auth.restaurant}</Title>
      <Grid>
        <AccountPanel />
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
            <a style={{marginRight: '2rem'}} href={`/restaurant/${auth.id}`} target='_blank'>
              <Button variant="contained">Go To Customer Menu</Button>
            </a>
            <Button onClick={onQrClick} variant="contained">
              Download QR Code
            </Button>

            <IconButton onClick={() => setOpen(!open)}>+</IconButton>
          </Settings>
          <CardContainer>
            {displayItems &&
              displayItems.map((item) => (
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
        </Panel>
      </Grid>
    </Container>
  );
}
