"use client";

import "core-js/stable";
import styled from "styled-components";
import Button from "../../styled/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import store from "../../redux/store";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCards } from "@/app/redux/slices/cardsSlice";

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

interface ControlPanelProps {
  onTranscriptChange?: (transcript: string) => void;
  resolveTextToPlay?: () => string;
  onClear?: () => void;
  omitRecord?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onTranscriptChange,
  resolveTextToPlay,
  onClear,
  omitRecord,
}) => {
  const [recordingState, setRecordingState] = useState(false);
  const [playingText, setPlayingText] = useState("");
  const { query } = useAppSelector((state) => state.cards);

  const dispatch = useAppDispatch();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      alert("== BROWSER SUPPORTS");
    } else {
      alert("== BROWSER DOES NOT SUPPORT");
    }
  }, []);

  const toggleRecording = async () => {
    setRecordingState(!recordingState);

    if (!recordingState) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "english",
        // interimResults: false,
      });
    } else {
      SpeechRecognition.abortListening();
      resetTranscript();
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
    if (query) {
      (async () => {
        const res = await axios.put<{
          data: [
            {
              card: string;
              image: string;
            }
          ];
        }>(`${process.env.NEXT_PUBLIC_HOST}/input`, {
          input_text: query,
        });

        // array is in res.data.data
        const cards = res.data.data.map((card) => {
          return {
            image: card.image,
            word: card.card.replace(/_/g, " "),
          };
        });

        store.dispatch(setCards(cards));
      })();
    }
  }, [query]);

  const playVoice = () => {
    if (!resolveTextToPlay) {
      return;
    }

    setPlayingText(resolveTextToPlay());
  };

  useEffect(() => {
    if (!onTranscriptChange || !transcript) {
      return;
    }

    onTranscriptChange(transcript);
  }, [onTranscriptChange, transcript]);

  useEffect(() => {
    if (playingText === "") {
      return;
    }

    if (window === undefined || window.speechSynthesis === undefined) {
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice =
      voices.find((voice) => voice.name == "Google US English") || voices[0];

    let utterance = new SpeechSynthesisUtterance(playingText);

    utterance.voice = selectedVoice;

    window.speechSynthesis.speak(utterance);

    setPlayingText("");
  }, [playingText]);

  return (
    <Wrapper className="panel">
      {omitRecord || (
        <Button
          onClick={toggleRecording}
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
      )}
      <Button onClick={() => playVoice()}>Play</Button>
      <Button
        onClick={() => {
          onClear ? onClear() : {};
          resetTranscript();
          dispatch(setCards([]));
        }}
      >
        Clear
      </Button>
    </Wrapper>
  );
};

export default ControlPanel;
