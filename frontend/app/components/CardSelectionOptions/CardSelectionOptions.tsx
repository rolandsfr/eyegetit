import styled from "styled-components";
import Button from "@/app/styled/Button";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCardSelectionMode } from "@/app/redux/slices/navSlice";
import { CardSelectionOptions } from "@/app/types";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: stretch;
  border-radius: 10px 10px 0px 0px;
  margin-top: 1em;
`;

const PanelButton: React.FC<{ option: CardSelectionOptions; name: string }> = ({
  option,
  name,
}) => {
  const dispatch = useAppDispatch();
  const { cardSelection } = useAppSelector((state) => state.navigation);

  return (
    <Button
      style={{
        backgroundColor: cardSelection === option ? "#E1E1E1" : "#F5F5F5",
      }}
      onClick={() => dispatch(setCardSelectionMode(option))}
    >
      {name}
    </Button>
  );
};

const cardSelectionOptions: React.FC = () => {
  return (
    <Wrapper>
      <PanelButton name="Recommended" option="recommended" />
      <PanelButton name="Categories" option="categories" />
      <PanelButton name="Add new image" option="generate" />
    </Wrapper>
  );
};

export default cardSelectionOptions;
