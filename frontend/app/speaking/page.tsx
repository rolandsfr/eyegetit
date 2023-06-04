"use client";

import styled from "styled-components";
import Container from "../styled/Container";

import ImageContainer from "../components/ImageContainer/ImageContainer";
import Input from "../components/Input/Input";

import ControlPanel from "../components/ControlPanel/ControlPanel";

import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import CardSelectionOptions from "../components/CardSelectionOptions/CardSelectionOptions";
import CardRow from "../components/CardRow/CardRow";
import axios from "axios";

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

interface CardInterface {
  url: string;
  word: string;
}

const Speaking = () => {
  const { cardSelection } = useAppSelector((state) => state.navigation);
  const [words, setWords] = useState<CardInterface[]>([]);

  useEffect(() => {
    if (cardSelection == "recommended") {
      (async () => {
        const res = await axios.get<{ words: CardInterface[] }>(
          "http://192.168.8.217:3001/cards/list"
        );
        setWords(res.data.words.slice(0, 30));
      })();
    }
  }, [cardSelection]);

  return (
    <StyledWrapper>
      <Container>
        <CardRow />
        <ControlPanel omitRecord={true} />
        <CardSelectionOptions />
        {cardSelection == "categories" ? (
          <></>
        ) : cardSelection == "generate" ? (
          <></>
        ) : (
          // recommended cards
          words.map((word) => {
            return (
              <div className="card">
                <div
                  className="image"
                  style={{
                    backgroundImage: word.url,
                  }}
                ></div>
              </div>
            );
          })
        )}
      </Container>
    </StyledWrapper>
  );
};

export default Speaking;
