import { useRef } from "react";
import styled from "styled-components";

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

  button {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #e1e1e1;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.5em 1.5em 0.5em 1.5em;
    right: 1em;
    bottom: 1em;
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

  const handleInputChange = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to calculate the actual scroll height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
    }
  };

  return (
    <Wrapper>
      <Textarea
        ref={textareaRef}
        onChange={(e) => {
          handleInputChange();
          return onValueChanged && definedValue != e.target.value
            ? onValueChanged(e.target.value)
            : {};
        }}
        defaultValue={definedValue}
      ></Textarea>
      <button className="submit">Submit</button>
    </Wrapper>
  );
};

export default Input;
