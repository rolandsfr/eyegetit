import styled, { StyledComponent } from "styled-components";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
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
  background-size: cover;
`;

const WordContainer = styled.div<{ word: string | null | undefined }>`
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.1);
  padding: 1em 0;
  text-align: center;
  box-shadow: ${(props) =>
    typeof props.word != "string"
      ? "inset 3px 2px 8px 1px rgba(0, 0, 0, 0.1);"
      : "2px 2px 6px rgba(0, 0, 0, 0.1);"};
  border-radius: 10px;
  min-height: 10px;
`;

const ImageContainer: React.FC<{
  url: string | null | undefined;
  name: string | null | undefined;
}> = ({ url, name }) => {
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
      ></ImageWrapper>
      <WordContainer word={name}>{name}</WordContainer>
    </Wrapper>
  );
};

export default ImageContainer;
