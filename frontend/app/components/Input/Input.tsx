import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  box-shadow: inset 3px 3px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  padding: 0.7em 0em 0.7em 0.7em;
  box-sizing: border-box;
`;

interface InputProps {
  definedValue?: string;
  onValueChanged?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ definedValue, onValueChanged }) => {
  return <Textarea onChange={(e) => onValueChanged && definedValue != e.target.value ? onValueChanged(e.target.value) : {}} defaultValue={definedValue} />;
};

export default Input;
