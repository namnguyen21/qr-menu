import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateModal from "./CreateModal";
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
  @media (max-width: 800px) {
    padding: 1rem 2rem;
  }
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
`;

const Sort = styled.div`
  margin-right: 2rem;
  @media (max-width: 800px) {
    order: 3;
  }
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

const ResponsiveBtn = styled(Button)`
  @media (max-width: 800px) {
    order: 2;
  }
`;

const ResponsiveA = styled.a`
  margin-right: 2rem;
  @media (max-width: 800px) {
    order: 1;
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
    <Container>
      <a
        id="download"
        style={{ display: "none" }}
        download="qr"
        href={qr ? qr : null}
        alt="Invisible download button"
      ></a>
      <CreateModal
        categories={categories && categories}
        open={open}
        setOpen={setOpen}
        auth={auth}
      ></CreateModal>
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
            <ResponsiveA
              style={{ marginRight: "2rem" }}
              href={`/restaurant/${auth.id}`}
              target="_blank"
            >
              <Button>Go To Customer Menu</Button>
            </ResponsiveA>
            <ResponsiveBtn onClick={onQrClick}>Download QR Code</ResponsiveBtn>

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
