import styled, { StyledComponent } from "styled-components";
import { useEffect, useRef } from "react";
import { CardInterface } from "../CardRow/CardRow";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1em;
  flex-grow: 1;
  width: 100%;
`;

const ImageWrapper = styled.div<{ state: string | null | undefined }>`
  box-shadow: ${(props) =>
    typeof props.state != "string"
      ? "inset 3px 2px 8px 1px rgba(0, 0, 0, 0.1);"
      : "2px 2px 6px rgba(0, 0, 0, 0.1);"};
  flex-grow: 1;
  border-radius: 10px;
  aspect-ratio: 1 / 1;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: ceter;
`;

const WordContainer = styled.div<{ word: string | null | undefined }>`
  text-align: center;
  margin-top: 0.5em;
`;

const SelectionUnit: React.FC<{
  url: string | null;
  word: string;
  onSelect?: (card: CardInterface) => void;
}> = ({ url, word, onSelect }) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <ImageWrapper
        ref={container}
        state={url}
        style={{
          height: container.current?.clientWidth,
          backgroundImage: `url(${url})`,
        }}
        onClick={() => onSelect ? onSelect({
          url,
          word,
        }) : {}}
      ></ImageWrapper>
      <WordContainer word={word}>{word}</WordContainer>
    </Wrapper>
  );
};

export default SelectionUnit;
