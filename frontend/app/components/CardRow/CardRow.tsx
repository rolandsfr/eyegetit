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

let it = 0;

const CardRow: React.FC = () => {
  const { cards } = useAppSelector((state) => state.cards);
  const [state, setState] = useState(null);

  const placeholderCards: any = [];

  useEffect(() => {
    for (let i = it; i < it + 4; i++) {
      let word = null;
      let image = null;

      if (cards[i]) {
        word = cards[i].word;
        image = cards[i].image;

        console.log(word);
      }
      placeholderCards.push(<ImageContainer key={i} url={image} name={word} />);
      it = i;
    }
    setState(null);
  }, [cards]);

  for (let i = 0; i < 4; i++) {
    let word = null;
    let image = null;

    if (cards[i]) {
      word = cards[i].word;
      image = cards[i].image;

      console.log(word);
    }
    placeholderCards.push(<ImageContainer key={i} url={image} name={word} />);
    it = i;
  }

  return <Wrapper>{placeholderCards}</Wrapper>;
};

export default CardRow;
