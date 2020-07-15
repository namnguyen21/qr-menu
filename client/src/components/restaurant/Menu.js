import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Restaurant from "../classes/Restaurant";
import Card from "./Card";
import {
  separateCategories,
} from "../../helperFunctions";

const Container = styled.div`
  width: 90vw;
  margin: auto;
`;

const Heading = styled.h2`
  font-size: 4rem;
  text-align: center;
  /* display: inline-block; */
  margin-left: 2rem;
  color: ${(props) => props.theme.colors.grey};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CardSection = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 4rem;
`;

const CardContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const CategoryName = styled.h4`
  color: ${(props) => props.theme.colors.black};
  font-size: 4rem;
  font-weight: 300;
`;

export default function Menu(props) {
  //get id of restaurant from url
  const { id: restaurantId } = props.match.params;

  const dispatch = useDispatch();

  //restaurant info
  const currentRestaurant = useSelector((state) => state.restaurant);
  const { name, menu } = currentRestaurant;

  useEffect(() => {
    const restaurant = new Restaurant(restaurantId);

    dispatch({
      type: "CURRENT_PATH",
      payload: "restaurant",
    });

    restaurant.getMenu().then((response) => {
      if (response.data) {
        const separatedMenu = separateCategories(response.data.menu);
        dispatch({
          type: "FETCH_RESTAURANT_MENU",
          payload: { menu: separatedMenu, name: response.data.restaurant },
        });
      }
    });
  }, []);

  // const onSelectChange = (e) => {
  //   setSelectValue(e.target.value);
  //   if (e.target.value.length > 0) {
  //     dispatch({ type: "SORT_DISPLAY", payload: e.target.value });
  //     setSorted(true);
  //   } else {
  //     dispatch({ type: "CLEAR_SORTED" });
  //     setSorted(false);
  //   }
  // };

  return (
    <Container>
      <Heading>{name}</Heading>
      {/* <Flex>
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
      </Flex> */}
      {menu &&
        menu.map((category) => (
          <CardSection>
            <CategoryName>{category.category}</CategoryName>
            <CardContainer>
              {category.items.map((item) => {
                return (
                  <Card
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl ? item.imageUrl : null}
                  />
                );
              })}
            </CardContainer>
          </CardSection>
        ))}
      {/* <CardContainer>
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
      </CardContainer> */}
    </Container>
  );
}
