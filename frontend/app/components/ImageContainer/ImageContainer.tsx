import styled, { StyledComponent } from "styled-components";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  .no-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    height: 100%;
    gap: 1em;
    width: 80%;
    margin: 0 auto;

    h3 {
      color: red;
      font-weight: bold;
      font-size: 1.6rem;
    }

    p {
      color: #7e7e7e;
      font-size: 1.4rem;
      line-height: 1.3;
    }
  }
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
  const { cards } = useAppSelector((state) => state.cards);

  return (
    <Wrapper>
      <ImageWrapper
        ref={container}
        state={url}
        style={{
          height: container.current?.clientWidth,
          backgroundImage: `url(${url})`,
        }}
      >
        {cards.length && url === "" ? (
          <div className="no-pic">
            <h3>Image is missing</h3>
            <p>Press to create an image</p>
          </div>
        ) : null}
      </ImageWrapper>
      <WordContainer word={name}>{name}</WordContainer>
    </Wrapper>
  );
};

export default ImageContainer;
