"use client";

import "regenerator-runtime/runtime";

import styled from "styled-components";
import Container from "../styled/Container";

import ImageContainer from "../components/ImageContainer/ImageContainer";
import Input from "../components/Input/Input";

import ControlPanel from "../components/ControlPanel/ControlPanel";

import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import CardRow, { CardInterface } from "../components/CardRow/CardRow";
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

const Speaking = () => {
  const { cardSelection } = useAppSelector((state) => state.navigation);
  const [words, setWords] = useState<CardInterface[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardInterface[]>([]);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (cardSelection == "recommended") {
      (async () => {
        const res = await axios.get<{ words: CardInterface[] }>(
          `${process.env.NEXT_PUBLIC_HOST}/cards/list`
        );

        if (res.data.words) {
          const words = res.data.words.slice(0, 30);
          setWords(words);
        } else {
          setWords([
            {
              url: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187.jpg?w=1272&h=848",
              word: "cat",
            },
          ]);
        }
      })();
    } else if (cardSelection == "categories") {
      (async () => {
        const res = await axios.get<{
          categories: { category: string; count: number }[];
        }>(`${process.env.NEXT_PUBLIC_HOST}/cards/categories`);
        const categories = res.data.categories;

        const processedCategoies: CardInterface[] = await Promise.all(
          categories.map(async (cat) => {
            const res = await axios.get<{ words: { url: string }[] }>(
              `${process.env.NEXT_PUBLIC_HOST}/cards/list?cat=${cat.category}`
            );

            const url = res.data.words[0].url;

            return {
              word: cat.category.replace(/_/g, " "),
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
          `${process.env.NEXT_PUBLIC_HOST}/cards/list?cat=${category}`
        );

        const images = res.data.words;
        setWords(images);
      })();
    }
  }, [category]);

  const addCard = (card: CardInterface) => {
    setSelectedCards([...selectedCards, card]);
  };

  return (
    <StyledWrapper>
      <Container>
        <CardRow cards={selectedCards} />
        <ControlPanel omitRecord={true} />
        <CardSelectionOptions categorySetter={setCategory} />
        {cardSelection == "categories" ? (
          category ? (
            <div className="cards">
              {words.map((props, index) => {
                return (
                  <SelectionUnit
                    word={props.word}
                    url={
                      !props.url ? props.url : props.url.replace(/\s/g, "%20")
                    }
                    key={index}
                  />
                );
              })}
            </div>
          ) : (
            <div className="categories">
              {words.map((props, index) => {
                return (
                  <div onClick={() => setCategory(props.word)} key={index}>
                    <SelectionUnit
                      word={props.word}
                      url={
                        !props.url ? props.url : props.url.replace(/\s/g, "%20")
                      }
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
                  word={props.word}
                  url={!props.url ? props.url : props.url.replace(/\s/g, "%20")}
                  key={index}
                  onSelect={(card) => addCard(card)}
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
