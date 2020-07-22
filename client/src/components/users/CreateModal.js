import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import Button from "../utility/Button";
import User from "../classes/User";
import Loader from "../utility/Loader"

// const LoaderAnimation = keyframes`
//   100% {
// 			transform: rotate(360deg)
// 	}
// `;

// const Loader = styled.span`
//   height: 3.6rem;
//   width: 3.6rem;
//   display: inline-block;
//   border: 0.4em solid transparent;
//   border-color: #eee;
//   border-top-color: #3e67ec;
//   border-radius: 50%;
//   animation: ${LoaderAnimation} 1s linear infinite;
// `;

const StyledModal = styled(Modal)`
  width: 40rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  outline: none;
  padding: 2rem;
`;


const Form = styled.form`
  height: 100%;
  width: 100%;
`;

const Group = styled.div`
  margin-top: 1rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
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

const ImageContainer = styled.div`
  height: calc((2 / 3) * 400px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #adbfd9;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const PlaceholderIcon = styled.i`
  font-size: 5rem;
  color: ${(props) => props.theme.colors.white};
`;

const HelperText = styled.p`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.white};
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

Modal.setAppElement("#root");

export default function EditModal({ open, setOpen, categories, auth }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("$");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const imageRef = useRef();

  const dispatch = useDispatch();

  const onUploadClick = (e) => {
    e.preventDefault();
    document.querySelector(".file-input").click();
  };

  const onFileSelection = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = function (event) {
      imageRef.current.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!category.trim() || !name.trim() || !price.trim()) {
      return setError("All fields with * must be filled.");
    }
    setLoading(true);
    //instantiate new user with ID
    const user = new User(auth.id);
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
          setName("");
          setCategory("");
          setDescription("");
          setPrice("");
          setImage("");
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
      <input
        style={{ display: "none" }}
        className="file-input"
        type="file"
        onChange={onFileSelection}
        name="file"
        accept=".jpg,.png"
      />
      <ImageContainer onClick={onUploadClick}>
        {!image ? (
          <React.Fragment>
            <PlaceholderIcon className="far fa-image"></PlaceholderIcon>
            <HelperText>Click to add an image</HelperText>
          </React.Fragment>
        ) : (
          <Image ref={imageRef} />
        )}
      </ImageContainer>
      <Form onSubmit={onFormSubmit}>
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
          <strong style={{ fontSize: "2rem" }}>OR*</strong>
          <div>
            <Label>Create New Category</Label>
            <Input onChange={(e) => setCategory(e.target.value)} type="text" />
          </div>
        </div>
        <Group>
          <Label>Name of Dish *</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </Group>
        <Group>
          <Label>Price *</Label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
        <Group>{error ? <ErrorMessage>{error}</ErrorMessage> : null}</Group>
        <Group style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          {loading ? (
            <Loader />
          ) : (
            <div style={{ display: "inline-block", width: "3.6rem" }}></div>
          )}
          <Button variant="filled">Submit</Button>
        </Group>
      </Form>
    </StyledModal>
  );
}
