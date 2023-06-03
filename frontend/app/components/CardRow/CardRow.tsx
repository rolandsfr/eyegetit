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
  const [cardComponents, setCardsComponents] = useState<any>([]);

  let intialStates = [
    {
      name: null,
      url: null,
    },
    {
      name: null,
      url: null,
    },
    {
      name: null,
      url: null,
    },
    {
      name: null,
      url: null,
    },
  ];

  useEffect(() => {
    // add first initial 4 cards
    // FIXME: WONT ADD ALL 4
    for (let i = 0; i < 4; i++) {
      setCardsComponents([
        ...cardComponents,
        <ImageContainer {...intialStates[i]} key={i} />,
      ]);
    }
  }, []);

  useEffect(() => {
    console.log(cardComponents);
  }, [cardComponents]);

  return <Wrapper>{cardComponents}</Wrapper>;
};

export default CardRow;
