import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  box-shadow: inset 3px 3px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  padding: 0.7em 0em 0.7em 0.7em;
  box-sizing: border-box;
`;

const Input: React.FC = () => {
  return <Textarea></Textarea>;
};

export default Input;
