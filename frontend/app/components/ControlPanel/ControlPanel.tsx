import styled from "styled-components";
import Button from "../../styled/Button";
import axios from "axios";
import { setCards } from "@/app/redux/slices/cardsSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import store from "../../redux/store";

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: stretch;
  background: #ffffff;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
`;

const fetchPictures = async (setState: Dispatch<SetStateAction<any>>) => {
  const res = await axios.put<{
    data: [
      {
        card: string;
        image: string;
      }
    ];
  }>("http://192.168.8.217:3001/input", {
    input_text:
      "Would you like to go there by red car or yellow bus or random taxi?",
  });

  // array is in res.data.data
  const cards = res.data.data.map((card) => {
    return {
      image: card.image,
      word: card.card,
    };
  });

  console.log(cards);

  store.dispatch(setCards(cards));
};

const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper className="panel">
      <Button onClick={() => fetchPictures(dispatch)}>Record</Button>
      <Button>Play</Button>
      <Button>Clear</Button>
    </Wrapper>
  );
};

export default ControlPanel;
