"use client";

import 'regenerator-runtime/runtime'

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
import SelectionUnit from "../components/SelectionUnit/SelectionUnit";

const StyledWrapper = styled.main`
  width: 100%;

  .cards {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 2em;
    align-items: stretch;
    padding-top: 1.5em;

    & > div {
      width: 100%;
    }
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
        const words = res.data.words.slice(0, 30);
        setWords(words);
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
          <div className="cards">
            {words.map((props, index) => {
              return (
                <SelectionUnit
                  name={props.word}
                  url={props.url.replace(/\s/g, "%20")}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </Container>
    </StyledWrapper>
  );
};

export default Speaking;
