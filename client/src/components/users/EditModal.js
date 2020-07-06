import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import Button from "../utility/Button";
import User from "../classes/User";

const LoaderAnimation = keyframes`
  100% {
			transform: rotate(360deg)
	}
`;

const Loader = styled.span`
  height: 3.6rem;
  width: 3.6rem;
  display: inline-block;
  border: 0.4em solid transparent;
  border-color: #eee;
  border-top-color: #3e67ec;
  border-radius: 50%;
  animation: ${LoaderAnimation} 1s linear infinite;
`;

const StyledModal = styled(Modal)`
  width: 70rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 3px ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  outline: none;
  padding: 4rem 2rem 2rem;
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
  position: absolute;
  top: 1rem;
  right: 1rem;
  text-align: center;
  cursor: pointer;
  i {
    font-size: 2rem;
  }
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
`;

const Group = styled.div`
  margin-top: 1rem;
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: 700;
`;

const Input = styled.input`
  height: 3rem;
  font-size: 1.6rem;
  width: 100%;
  margin-top: 1rem;
  padding: 0 1rem;
`;

const Select = styled.select`
  width: 100%;
  margin-top: 1rem;
  height: 3rem;
  font-size: 1.6rem;
`;

const Option = styled.option`
  height: 3rem;
  font-size: 3rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  color: red;
`;

Modal.setAppElement("#root");

export default function EditModal({ open, setOpen, categories }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("$");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onUploadClick = (e) => {
    e.preventDefault();
    document.querySelector(".file-input").click();
  };

  const onFileSelection = (e) => {
    setImage(e.target.files[0]);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //instantiate new user with ID
    const user = new User("1");
    user
      .addMenuItemWithImage({
        category,
        name,
        description,
        price,
        file: image,
      })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          console.log(response);
          setOpen(false);
          dispatch({ type: "ADD_ITEM", payload: response.data });
        } else {
          setError("Oops, something went wrong. Please try again.");
        }
      });
  };
  return (
    <StyledModal
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      }}
      isOpen={open}
    >
      <IconButton onClick={() => setOpen(!open)}>
        <i className="fas fa-times"></i>
      </IconButton>
      <Form onSubmit={onFormSubmit}>
        {/* <Form method="post" action="/menu/images"> */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40% auto 40%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Label>Choose Existing Category</Label>
            <Select onChange={(e) => setCategory(e.target.value)} type="select">
              {categories &&
                categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              <Option value="" selected disabled hidden></Option>
            </Select>
          </div>
          <strong style={{ fontSize: "2rem" }}>OR</strong>
          <div>
            <Label>Create New Category</Label>
            <Input onChange={(e) => setCategory(e.target.value)} type="text" />
          </div>
        </div>
        <Group>
          <Label>Name of Dish</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </Group>
        <Group>
          <Label>Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </Group>
        <Group>
          <Label>Price</Label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
          />
        </Group>
        <Group>{error ? <ErrorMessage>{error}</ErrorMessage> : null}</Group>
        <Group style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{ backgroundColor: image ? "#000000" : null }}
              onClick={onUploadClick}
              variant="filled"
            >
              <i
                style={{ fontSize: "2rem", marginRight: "0.5rem" }}
                className="fas fa-upload"
              ></i>
              Upload Image
            </Button>
            <input
              style={{ display: "none" }}
              className="file-input"
              type="file"
              onChange={onFileSelection}
              name="file"
            />
            <Button variant="filled">Submit</Button>
            {loading ? (
              <Loader />
            ) : (
              <div style={{ display: "inline-block", width: "3.6rem" }}></div>
            )}
          </div>
        </Group>
      </Form>
    </StyledModal>
  );
}
