import { useRef } from "react";
import styled from "styled-components";
import { setQuery } from "@/app/redux/slices/cardsSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  box-shadow: inset 3px 3px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  padding: 0.3em 0em 0.3em 2em;
  box-sizing: border-box;
  position: relative;
  margin-top: 1em;
  padding-bottom: 1em;

  button.submit {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #00009e;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.5em 1.5em 0.5em 1.5em;
    right: 1em;
    bottom: 1em;
    transition: 0.4s all;
    color: #fff;

    &:hover {
      background-color: #0000ed;
    }
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: none;
  box-sizing: border-box;
  outline: none;
  background: none;
  width: 85%;
`;

interface InputProps {
  definedValue?: string;
  onValueChanged?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ definedValue, onValueChanged }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");

  const handleInputChange = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to calculate the actual scroll height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
    }
  };

  const valueToSubmit = value || definedValue;

  return (
    <Wrapper>
      <Textarea
        ref={textareaRef}
        onChange={(e) => {
          handleInputChange();
          setValue(e.target.value);
          return onValueChanged && definedValue != e.target.value
            ? onValueChanged(e.target.value)
            : {};
        }}
        defaultValue={definedValue}
      ></Textarea>
      <button
        className="submit"
        onClick={
          valueToSubmit ? () => dispatch(setQuery(valueToSubmit)) : () => {}
        }
      >
        Submit
      </button>
    </Wrapper>
  );
};

export default Input;
