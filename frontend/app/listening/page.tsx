"use client";

import "regenerator-runtime/runtime";

import styled from "styled-components";
import Container from "../styled/Container";

import ImageContainer from "../components/ImageContainer/ImageContainer";
import Input from "../components/Input/Input";

import ControlPanel from "../components/ControlPanel/ControlPanel";
import Header from "../components/Header/Header";

import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import CardRow from "../components/CardRow/CardRow";
import { useModal } from "../components/Modal/Modal";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCards } from "../redux/slices/cardsSlice";

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

  .add-image-container {
    display: flex;
    gap: 2em;

    .option {
      background: #ffffff;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      padding: 2em;

      p {
        max-width: 100px;
        line-height: 1.3;
      }
    }
  }
`;

const Listening = () => {
  const [transcript, setTranscript] = useState<string | undefined>();
  const [inputText, setInputText] = useState("");
  const { cards } = useAppSelector((state) => state.cards);
  const { Modal, openModal, closeModal } = useModal();

  // const dispatch = useAppDispatch();

  return (
    <StyledWrapper>
      <Container>
        <CardRow
          modalOpener={openModal}
          cards={cards.map((obj) => ({ url: obj.image, word: obj.word }))}
        />
        <Input
          definedValue={transcript}
          onValueChanged={(value) => setInputText(value)}
        />
        <ControlPanel
          onTranscriptChange={(value) => setTranscript(value)}
          resolveTextToPlay={() => inputText || transcript || ""}
          onClear={() => {
            setInputText("");
            setTranscript("");
            // dispatch(setCards([]));
          }}
        />
      </Container>
      <Modal>
        <div className="add-image-container">
          <div className="option">
            <p>Upload image from storage</p>
          </div>
          <div className="option">
            <p>Capture image with camera</p>
          </div>
        </div>
      </Modal>
    </StyledWrapper>
  );
};

export default Listening;
