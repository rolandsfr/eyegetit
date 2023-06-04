"use client";

import styled from "styled-components";
import Container from "../styled/Container";

import ImageContainer from "../components/ImageContainer/ImageContainer";
import Input from "../components/Input/Input";

import ControlPanel from "../components/ControlPanel/ControlPanel";
import Header from "../components/Header/Header";

import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import CardRow from "../components/CardRow/CardRow";

const StyledWrapper = styled.main`
  width: 100%;

  .images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 2em;
    align-items: center;
    padding-top: 5.5em;
  }

  textarea {
    margin-top: 1em;
  }

  .panel {
    margin-top: 1em;
  }
`;

const Listening = () => {
  const { cards } = useAppSelector((state) => state.cards);
  const [transcript, setTranscript] = useState("");
  const [value, setValue] = useState("");

  return (
    <StyledWrapper>
      <Header />
      <Container>
        <CardRow />
        <Input value={transcript || value} onValueChanged={(value) => setValue(value)} />
        <ControlPanel onTranscriptChange={(value) => setTranscript(value)} resolveTextToPlay={() => value} />
      </Container>
    </StyledWrapper>
  );
};

export default Listening;
