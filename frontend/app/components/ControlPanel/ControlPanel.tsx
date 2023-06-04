import "core-js/stable";
import styled from "styled-components";
import Button from "../../styled/Button";
import axios from "axios";
import { setCards } from "@/app/redux/slices/cardsSlice";
import { useEffect, useState } from "react";
import store from "../../redux/store";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

const ControlPanel: React.FC = () => {
  const [recordingState, setRecordingState] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const fetchPictures = async () => {
    setRecordingState(!recordingState);
    if (!recordingState) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "english",
        // interimResults: false,
      });
    } else {
      SpeechRecognition.abortListening();
    }

    // setRecordingState(!recordingState);
    // const res = await axios.put<{
    //   data: [
    //     {
    //       card: string;
    //       image: string;
    //     }
    //   ];
    // }>("http://192.168.8.217:3001/input", {
    //   input_text:
    //     "Would you like to go there by red car or yellow bus or random taxi",
    // });

    // // array is in res.data.data
    // const cards = res.data.data.map((card) => {
    //   return {
    //     image: card.image,
    //     word: card.card,
    //   };
    // });

    // store.dispatch(setCards(cards));
  };

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  return (
    <Wrapper className="panel">
      <Button
        onClick={fetchPictures}
        style={
          recordingState
            ? {
                backgroundColor: "#F47474",
              }
            : {}
        }
      >
        {!recordingState ? "Record" : "Stop recording"}
      </Button>
      <Button>Play</Button>
      <Button>Clear</Button>
    </Wrapper>
  );
};

export default ControlPanel;
