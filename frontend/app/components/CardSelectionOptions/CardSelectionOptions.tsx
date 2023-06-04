import styled from "styled-components";
import Button from "@/app/styled/Button";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCardSelectionMode } from "@/app/redux/slices/navSlice";

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: stretch;
  border-radius: 10px 10px 0px 0px;
  margin-top: 1em;
`;

const cardSelectionOptions: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Button onClick={() => dispatch(setCardSelectionMode("recommended"))}>
        Recommended
      </Button>
      <Button onClick={() => dispatch(setCardSelectionMode("categories"))}>
        Categories
      </Button>
      <Button onClick={() => dispatch(setCardSelectionMode("generate"))}>
        Add new image
      </Button>
    </Wrapper>
  );
};

export default cardSelectionOptions;
