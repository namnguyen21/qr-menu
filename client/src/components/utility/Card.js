import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import IconButton from "./IconButton";
import Button from "./Button";
import User from "../classes/User";

const CardWrapper = styled.div`
  width: 30%;
  border-radius: 1rem;
  display: block;
`;

const CardImage = styled.img`
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
`;

const CardContent = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 2rem;
  height: auto;
  color: ${(props) => props.theme.colors.grey};

  margin-bottom: 1rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.p`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.grey};
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  font-size: 1.6rem;
  padding: 0.5rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Warning = styled.p`
  font-size: 1.6rem;
  color: orangered;
`;

export default function Card({
  id,
  imageUrl,
  name,
  description,
  price,
  onEditClick,
}) {
  // switchable edit mode
  const [edit, setEdit] = useState(false);
  const [itemName, setItemName] = useState(name);
  const [warning, setWarning] = useState(false);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemPrice, setItemPrice] = useState(price);

  const dispatch = useDispatch();

  const onEditSubmit = (e) => {
    const editedMenuItem = {
      id: id,
      name: itemName,
      description: itemDescription,
      price: itemPrice,
    };

    const user = new User();
    user.editMenuItem(id, editedMenuItem).then((response) => {
      setEdit(false);
      dispatch({
        type: "EDIT_ITEM",
        payload: {
          id: response.data.id,
          item: response.data,
        },
      });
    });
  };

  const onDelete = () => {
    if (!warning) {
      setWarning(true);
    } else {
      // on confirmation click
      const user = new User();
      user.deleteMenuItem(id).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "DELETE_ITEM",
            payload: id,
          });
        }
      });
    }
  };

  return (
    <CardWrapper>
      {imageUrl ? <CardImage alt={name} src={imageUrl} /> : null}
      <CardContent>
        {edit ? (
          <React.Fragment>
            <Label>Name of Dish</Label>
            <Input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Label>Description</Label>
            <Input
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
            <Label>Price</Label>
            <Input
              type="text"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            {warning ? (
              <Warning>Click 'delete' icon again to confirm.</Warning>
            ) : null}
            <Flex>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
              <Button onClick={onDelete} variant="filled">
                <i className="far fa-trash-alt"></i>
              </Button>
              <Button onClick={onEditSubmit} variant="filled">
                Submit
              </Button>
            </Flex>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <Flex>
              <Price>{price}</Price>
              <IconButton onClick={() => setEdit(!edit)}>
                <i className="fas fa-pencil-alt"></i>
              </IconButton>
            </Flex>
          </React.Fragment>
        )}
      </CardContent>
    </CardWrapper>
  );
}
