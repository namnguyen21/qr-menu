import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import Button from "./Button";
import User from "../classes/User";
import Placeholder from "../../images/food-placeholder.png";
import InputGroup from "../utility/InputGroup";

const CardWrapper = styled.div`
  width: 30%;
  border-radius: 1rem;
  display: block;
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  position: relative;
`;

const ChangeImageButton = styled.i`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.2rem;
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
  background-color: ${(props) => props.theme.colors.white};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;
const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.6rem;
  height: auto;
  color: ${(props) => props.theme.colors.grey};
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Price = styled.p`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.grey};
  margin-bottom: 1rem;
`;

const Warning = styled.p`
  font-size: 1.6rem;
  color: orangered;
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  width: 100%;
  border-top: solid 1px #ccc;
  display: flex;
  justify-content: space-evenly;
  i {
    color: ${(props) => props.theme.colors.grey};
    font-size: 2rem;
    cursor: pointer;
    transition: color 1s;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const StyledLazyLoad = styled(LazyLoad)`
  width: 100%;
`;

export default function Card({
  id,
  imageUrl,
  name,
  description,
  category,
  price,
  onEditClick,
}) {
  // switchable edit mode
  const [edit, setEdit] = useState(false);
  const [itemName, setItemName] = useState(name);
  const [warning, setWarning] = useState(false);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemPrice, setItemPrice] = useState(price);

  //create ref for image upload button
  const imageUploader = useRef();

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

  const onEditImageClick = () => {
    //open files
    imageUploader.current.click();
  };

  // upload newly selected image and change current display
  const onImageUpload = (e) => {
    setTimeout(() => {}, 500);
    const user = new User();
    user
      .editImage(id, { name, description, category, price }, e.target.files[0])
      .then((response) => {
        const { data } = response;
        dispatch({
          type: "EDIT_ITEM",
          payload: {
            id: data.id,
            item: data,
          },
        });
      });
  };

  return (
    <CardWrapper className="box-shadow">
      <CardImageWrapper>
        <StyledLazyLoad>
          <CardImage alt={name} src={imageUrl ? imageUrl : Placeholder} />
        </StyledLazyLoad>
        <ChangeImageButton
          onClick={onEditImageClick}
          className="fas fa-photo-video"
        >
          <input
            onChange={onImageUpload}
            ref={imageUploader}
            type="file"
            style={{ display: "none" }}
            accept=".jpg,.png"
          />
        </ChangeImageButton>
      </CardImageWrapper>

      <CardContent>
        {edit ? (
          <React.Fragment>
            <InputGroup
              label="Name of Dish"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            {/* <Label>Name of Dish</Label>
            <Input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            /> */}
            <InputGroup
              type="text"
              label="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            {/* <Label>Price</Label>
            <Input
              type="text"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            /> */}
            <InputGroup
              label="Description"
              value={itemDescription}
              type="text"
              onChange={(e) => setItemDescription(e.target.value)}
            />
            {/* <Label>Description</Label>
            <Input
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            /> */}
            {/* {warning ? (
              <Warning>Click 'delete' icon again to confirm.</Warning>
            ) : null} */}
            <Flex>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
              <Button onClick={onEditSubmit} variant="filled">
                Submit
              </Button>
            </Flex>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CardTitle>{name}</CardTitle>
            <Price>{price}</Price>
            <CardDescription>{description}</CardDescription>
            {warning ? (
              <Warning>Click 'delete' icon again to confirm.</Warning>
            ) : null}
            {/* <Flex>
              
              <IconButton onClick={() => setEdit(!edit)}>
                <i className="fas fa-pencil-alt"></i>
              </IconButton>
            </Flex> */}
            <ButtonGroup>
              <i
                label="delete"
                onClick={onDelete}
                className="far fa-trash-alt"
              ></i>
              <i
                onClick={() => setEdit(!edit)}
                className="fas fa-pencil-alt"
              ></i>
            </ButtonGroup>
          </React.Fragment>
        )}
      </CardContent>
    </CardWrapper>
  );
}
