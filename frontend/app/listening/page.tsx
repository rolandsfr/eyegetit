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

  .gen-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3em;

    .row {
      display: flex;

      .slots {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        align-items: stretch;
        gap: 2em;
      }

      .slots div,
      .upload-img {
        background: #ffffff;
        box-shadow: inset 3px 3px 6px 1px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        width: 100px;
        height: 100px;
      }

      .upload-img {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 1.4rem;
        margin-left: 2em;

        p {
          max-width: 50px;
        }
      }
    }

    input {
      background: #ffffff;
      box-shadow: inset 3px 3px 12px 1px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      border: none;
      outline: none;
      padding: 1em;
      width: 300px;
      margin: 0 auto;
    }

    .buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        background: #e1e1e1;
        border-radius: 10px;
      }
    }
  }
`;

const Listening = () => {
  const [transcript, setTranscript] = useState<string | undefined>();
  const [inputText, setInputText] = useState("");
  const { cards } = useAppSelector((state) => state.cards);
  const { Modal, openModal, closeModal } = useModal();
  const [modalAction, setModalAction] = useState<null | "generate" | "upload">(
    null
  );

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
        {modalAction === null ? (
          <div>
            <div className="gen-image">
              <div className="row">
                <div className="slots">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="upload-img" onClick={() => openModal()}>
                  <p>Upload your image</p>
                </div>
              </div>
              <input type="text" placeholder="Type your word here" />
              <div className="buttons">
                <button className="gen">Generate</button>
                <button className="clear disabled">Clear</button>
              </div>
            </div>
          </div>
        ) : modalAction === "upload" ? (
          <div className="add-image-container">
            <div className="option">
              <p>Upload image from storage</p>
            </div>
            <div className="option">
              <p>Capture image with camera</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </StyledWrapper>
  );
};

export default Listening;
