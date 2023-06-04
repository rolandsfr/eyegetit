"use client";

import styled from "styled-components";
import Container from "../styled/Container";

import ImageContainer from "../components/ImageContainer/ImageContainer";
import Input from "../components/Input/Input";

import ControlPanel from "../components/ControlPanel/ControlPanel";

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

  return (
    <StyledWrapper>
      <Container>
        <CardRow />
        <Input value={transcript} />
        <ControlPanel onTranscriptChange={setTranscript} />
      </Container>
    </StyledWrapper>
  );
};

export default Listening;
