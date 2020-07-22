import React, { useRef, useState } from "react";
import styled from "styled-components";
import AccountContainer from "./AccountContainer";
import Button from "../utility/Button";
import Loader from "../utility/Loader";
import User from "../classes/User";

const Container = styled.div`
  width: 100%;
`;

const Section = styled.div`
  max-width: 70rem;
  margin: auto;
  margin-bottom: 2rem;

  > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;

const SectionHeader = styled.h2`
  font-size: 4rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionContent = styled.p`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.grey};
  font-weight: 400;
  line-height: 1.5;
`;

const Editor = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 1rem;
`;

const Line = styled.div`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.white};
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  border: solid 1px ${(props) => props.theme.colors.primary};
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border: solid 1px ${(props) => props.theme.colors.primary};
  }
`;

const StyledLoader = styled(Loader)`
  height: 2rem;
  width: 2rem;
  margin-right: 2rem;
`;

export default function UploadCsv() {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    setLoading(true);
    const csv = e.target.files[0];
    const user = new User(1);
    user.postCsv(csv).then((response) => {
      setLoading(false);
    });
  };

  return (
    <AccountContainer>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept=".csv"
        onChange={onFileChange}
      />
      <Container>
        <Section>
          <SectionHeader>
            What is a CSV File?
            <StyledButton onClick={onClick} variant="filled">
              {loading ? <StyledLoader /> : null}
              Upload File
            </StyledButton>
          </SectionHeader>
          <SectionContent>
            A CSV file is a comma separated text file. Commas are used to
            separate data values and new lines are used to create new data
            records.
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader>How do I create a CSV file?</SectionHeader>
          <SectionContent>
            CSV files can be created using either a text editor or a spread
            sheet editor, such as Google Sheets or Microsoft's Excel. To use a
            spreadsheet editor, each row indicates a new item and each column
            indicates a new data value. Once done, save the file using a .csv
            file format.
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader>Important Notes</SectionHeader>
          <SectionContent>
            For best results, use the following format: NAME OF DISH, CATEGORY,
            PRICE, DESCRIPTION.
          </SectionContent>
          <SectionContent>
            Items can be left blank but must still use a comma. The following
            example shows how three menu items can be created with certain
            fields left blank:
          </SectionContent>
          <Editor>
            <Line>NAME,CATEGORY,PRICE,DESCRIPTION</Line>
            <Line>Garlic Bread,Appetizers,8.99,Freshly baked garlic bread</Line>
            <Line>Spaghetti,Pasta,12.99,,</Line>
            <Line>
              Pepperoni Pizza,Pizza,15.99,Pepperoni pizza on homemade dough
            </Line>
          </Editor>
        </Section>
        <Section>
          <StyledButton onClick={onClick} variant="filled">
            {loading ? <StyledLoader /> : null}
            Upload File
          </StyledButton>
        </Section>
      </Container>
    </AccountContainer>
  );
}
