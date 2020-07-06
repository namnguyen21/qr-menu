import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Restaurant from "../classes/Restaurant";
import Card from "./Card";
import { createCategoriesList } from "../../helperFunctions";

const Container = styled.div`
  width: 80vw;
  margin: auto;
`;

const Heading = styled.h2`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.black};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  margin: -10px 0 0 0;
  > * {
    margin-top: 20px;
  }
`;

const Label = styled.span`
  font-size: 2rem;
  margin-right: 2rem;
`;

const Select = styled.select`
  width: 20rem;
  height: 3rem;
  font-size: 2rem;
`;

const Option = styled.option`
  height: 3rem;
  font-size: 3rem;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0;
`;

const Checkbox = styled.input`
  height: 2.4rem;
`;

export default function Menu(props) {
  //get id of restaurant from url
  const { id: restaurantId } = props.match.params;
  const [selectValue, setSelectValue] = useState("");
  const [sorted, setSorted] = useState(false);

  const dispatch = useDispatch();

  //restaurant info
  const currentRestaurant = useSelector((state) => state.restaurant);
  const { name, menu, display } = currentRestaurant;

  const categories = menu && createCategoriesList(menu);

  useEffect(() => {
    const restaurant = new Restaurant(restaurantId);
    restaurant.getMenu().then((response) => {
      if (response.data) {
        dispatch({
          type: "FETCH_RESTAURANT_MENU",
          payload: response.data,
        });
      }
    });
  }, []);

  const onSelectChange = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value.length > 0) {
      dispatch({ type: "SORT_DISPLAY", payload: e.target.value });
      setSorted(true);
    } else {
      dispatch({ type: "CLEAR_SORTED" });
      setSorted(false);
    }
  };

  const onClear = () => {
    setSorted(false);
    dispatch({
      type: "CLEAR_SORTED",
    });
  };

  return (
    <Container>
      <Heading>Welcome to {name}</Heading>
      <Flex>
        <div>
          <Label>Browse by category: </Label>
          <Select value={selectValue} onChange={onSelectChange}>
            <Option value="" selected disabled></Option>
            {sorted ? <Option value="">View All</Option> : null}
            {categories &&
              categories.map((category, index) => (
                <Option value={category}>{category}</Option>
              ))}
          </Select>
        </div>
      </Flex>
      <CardContainer>
        {display
          ? display.map((item) => (
              <Card
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl ? item.imageUrl : null}
              />
            ))
          : null}
      </CardContainer>
    </Container>
  );
}
