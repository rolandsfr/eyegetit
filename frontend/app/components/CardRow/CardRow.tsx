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

export interface CardInterface {
  url: string | null;
  word: string;
}

interface CardRowProps {
  cards: CardInterface[];
  onCardSelect?: (card: CardInterface) => void;
}

const CardRow: React.FC<CardRowProps> = ({ cards, onCardSelect }) => {
  const [cardComponents, setCardsComponents] = useState<any>([{}, {}, {}, {}]);

  useEffect(() => {
    const rowsToAppend =
      cardComponents.length < cards.length
        ? Math.ceil(cards.length / 4) - 1
        : 0;

    cards.forEach((card, index) => {
      cardComponents[index] = card;
    });

    const emptyObjects = [];

    if (rowsToAppend > 0) {
      for (let i = 0; i < rowsToAppend * 4; i++) {
        emptyObjects.push({});
      }
    }

    setCardsComponents([...cardComponents, ...emptyObjects]);
  }, [cards]);

  return (
    <Wrapper>
      {cardComponents.map((card: any, index: any) => {
        return (
          <ImageContainer
            key={index}
            word={card?.word}
            url={card?.url}
            onClick={(card) => onCardSelect ? onCardSelect(card) : {}}
          />
        );
      })}
    </Wrapper>
  );
};

export default CardRow;
