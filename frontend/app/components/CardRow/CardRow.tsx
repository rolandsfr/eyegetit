import ImageContainer from "../ImageContainer/ImageContainer";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  gap: 2em;
  align-items: center;
  padding-top: 5.5em;
`;

export interface CardInterface extends CardPlaceholder {
  url: string | null;
  word: string;
}

export interface CardPlaceholder {
  url: string | null;
  word: string | null;
}

interface CardRowProps {
  cards: CardInterface[];
  onCardSelect?: (card: CardInterface) => void;
  modalOpener: () => any;
}

const InitialPlaceholder: CardPlaceholder = {
  word: null,
  url: null,
};

const EmptyRow = [
  InitialPlaceholder,
  InitialPlaceholder,
  InitialPlaceholder,
  InitialPlaceholder,
];

const CardRow: React.FC<CardRowProps> = ({
  cards,
  onCardSelect,
  modalOpener,
}) => {
  const [cardComponents, setCardsComponents] =
    useState<CardPlaceholder[]>(EmptyRow);

  useEffect(() => {
    const placeholdersToAppend =
      cardComponents.length < cards.length
        ? Math.ceil(cards.length / EmptyRow.length) * EmptyRow.length -
          cards.length
        : 0;

    cards.forEach((card, index) => {
      cardComponents[index] = card;
    });

    const emptyObjects: CardPlaceholder[] = [];

    for (let i = 0; i < placeholdersToAppend; i++) {
      emptyObjects.push(InitialPlaceholder);
    }

    setCardsComponents([...cardComponents, ...emptyObjects]);
  }, [cards]);

  return (
    <Wrapper>
      {cardComponents.map((card: any, index: any) => {
        return (
          <ImageContainer
            modalOpener={modalOpener}
            key={index}
            word={card?.word}
            url={card?.url}
            onClick={(card) => (onCardSelect ? onCardSelect(card) : {})}
          />
        );
      })}
    </Wrapper>
  );
};

export default CardRow;
