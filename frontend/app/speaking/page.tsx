"use client";

import 'regenerator-runtime/runtime'

import styled from "styled-components";
import Container from "../styled/Container";

import ImageContainer from "../components/ImageContainer/ImageContainer";
import Input from "../components/Input/Input";

import ControlPanel from "../components/ControlPanel/ControlPanel";

import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import CardRow from "../components/CardRow/CardRow";
import axios from "axios";
import SelectionUnit from "../components/SelectionUnit/SelectionUnit";
import { setCardSelectionMode } from "../redux/slices/navSlice";
import CardSelectionOptions from "../components/CardSelectionOptions/CardSelectionOptions";
import { setCards } from "../redux/slices/cardsSlice";

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

  .categories {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 0 2em;
    align-items: stretch;
    padding-top: 1.5em;

    & > div {
      width: 100%;
      height: 80%;
    }
  }

  .panel {
    margin-top: 1em;
  }
`;

interface CardInterface {
  url: string;
  name: string;
}

const Speaking = () => {
  const { cardSelection } = useAppSelector((state) => state.navigation);
  const [words, setWords] = useState<CardInterface[]>([]);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (cardSelection == "recommended") {
      (async () => {
        const res = await axios.get<{ words: CardInterface[] }>(
          "http://192.168.8.217:3001/cards/list"
        );
        const words = res.data.words.slice(0, 30);
        setWords(words);
      })();
    } else if (cardSelection == "categories") {
      (async () => {
        const res = await axios.get<{
          categories: { category: string; count: number }[];
        }>("http://192.168.8.217:3001/cards/categories");
        const categories = res.data.categories;

        const processedCategoies: CardInterface[] = await Promise.all(
          categories.map(async (cat) => {
            const res = await axios.get<{ words: { url: string }[] }>(
              `http://192.168.8.217:3001/cards/list?cat=${cat.category}`
            );

            const url = res.data.words[0].url;

            return {
              name: cat.category,
              url,
            };
          })
        );
        setWords(processedCategoies);
      })();
    }
  }, [cardSelection]);

  useEffect(() => {
    if (category) {
      (async () => {
        const res = await axios.get<{ words: CardInterface[] }>(
          `http://192.168.8.217:3001/cards/list?cat=${category}`
        );

        const images = res.data.words;

        setWords(images);
        console.log(words);
      })();
      console.log(category);
    }
  }, [category]);

  return (
    <StyledWrapper>
      <Container>
        <CardRow />
        <ControlPanel omitRecord={true} />
        <CardSelectionOptions categorySetter={setCategory} />
        {cardSelection == "categories" ? (
          category ? (
            <div className="cards">
              {words.map((props, index) => {
                return (
                  <SelectionUnit
                    name={props.name}
                    url={props.url.replace(/\s/g, "%20")}
                    key={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="categories">
              {words.map((props, index) => {
                return (
                  <div onClick={() => setCategory(props.name)} key={index}>
                    <SelectionUnit
                      name={props.name}
                      url={props.url.replace(/\s/g, "%20")}
                    />
                  </div>
                );
              })}
            </div>
          )
        ) : cardSelection == "generate" ? (
          <></>
        ) : (
          // recommended cards
          <div className="cards">
            {words.map((props, index) => {
              return (
                <SelectionUnit
                  name={props.name}
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
