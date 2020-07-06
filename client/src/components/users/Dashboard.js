import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditModal from "./EditModal";
import User from "../classes/User";
import Card from "../utility/Card";
import Button from "../utility/Button";
import { createCategoriesList } from "../../helperFunctions";

const Container = styled.div`
  height: 70vh;
  margin: auto;
  width: 90rem;
`;
const Title = styled.h2`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.black};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PanelTitle = styled.h3`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.black};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Panel = styled.div`
  width: 100%;
  min-height: 50rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  position: relative;
  padding: 2rem;
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
  margin-bottom: 2rem;
  align-items: center;
`;

export default function Dashboard() {
  //   const [active, setActive] = useState("view");
  //modal control
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  //list of all items available
  const menu = useSelector((state) => state.menu.items);

  // list of selected items to display, default = all
  const displayItems = useSelector((state) => state.menu.display);

  //sort selector
  const onSortChange = (e) => {
    const sortSelection = e.target.value;
    const sorted = menu.filter(
      (item) =>
        item.category.trim().toLowerCase() == sortSelection.trim().toLowerCase()
    );

    dispatch({
      type: "CHANGE_DISPLAY",
      payload: sorted,
    });
  };

  //categories for select menu
  const categories = menu && createCategoriesList(menu);

  useEffect(() => {
    const user = new User("1");
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
      <EditModal
        categories={categories && categories}
        open={open}
        setOpen={setOpen}
      ></EditModal>
      <Title>Restaurant Name</Title>
      <Panel className="box-shadow">
        <Settings>
          <Sort>
            <Label>Sort by category: </Label>
            <Select onChange={onSortChange} type="select">
              {categories &&
                categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              <Option value="" selected disabled hidden></Option>
            </Select>
          </Sort>
          <Button variant="contained">View Customer Menu</Button>
          <a
            href="https://res.cloudinary.com/djuq5cwgy/image/upload/fl_attachment/v1593727257/qrmenu/k4vbakel4ak1afqcm55a.jpg"
            download
            target="_blank"
            style={{marginRight: '2rem'}}
          >
            <Button variant="contained">Get QR Code</Button>
          </a>

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
    </Container>
  );
}
