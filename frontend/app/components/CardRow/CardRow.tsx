import ImageContainer from "../ImageContainer/ImageContainer";
import styled from "styled-components";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  gap: 2em;
  align-items: center;
  padding-top: 5.5em;
`;

const CardRow: React.FC = () => {
  const { cards } = useAppSelector((state) => state.cards);
  const [cardComponents, setCardsComponents] = useState<any>([{}, {}, {}, {}]);

  let initialState = {
    name: null,
    url: null,
  };

  useEffect(() => {
    const rowsToAppend =
      cardComponents.length < cards.length
        ? Math.ceil(cards.length / 4) - 1
        : 0;

    if (rowsToAppend > 0) {
      const emptyObjects = [];
      for (let i = 0; i < rowsToAppend * 4; i++) {
        emptyObjects.push({});
      }
      setCardsComponents([...cardComponents, ...emptyObjects]);
    }
  }, [cards]);

  return (
    <Wrapper>
      {cardComponents.map((card: any, index: any) => {
        return (
          <ImageContainer
            key={index}
            name={cards[index]?.word}
            url={cards[index]?.image}
          />
        );
      })}
    </Wrapper>
  );
};

export default CardRow;
