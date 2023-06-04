import styled from "styled-components";
import Button from "@/app/styled/Button";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setCardSelectionMode } from "@/app/redux/slices/navSlice";
import { CardSelectionOptions } from "@/app/types";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { usePathname } from "next/navigation";

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: stretch;
  border-radius: 10px 10px 0px 0px;
  margin-top: 1em;

  /* button {
    color: #fff;
    background-color: #009846 !important;

    &:hover {
      background-color: #00b955;
    }
  } */

  button {
    color: #fff;
    transition: 0.4s all;
  }

  button.disabled {
    background-color: #ebebeb;
    color: #989898;
  }

  .speaking-btn {
    &:hover {
      background-color: #00b955;
    }
  }
`;

const PanelButton: React.FC<{ option: CardSelectionOptions; name: string }> = ({
  option,
  name,
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { cardSelection } = useAppSelector((state) => state.navigation);

  return (
    <Button
      style={{
        backgroundColor: cardSelection === option ? "#009846" : "#00B955",
      }}
      onClick={() => dispatch(setCardSelectionMode(option))}
      className={pathname == "speaking" ? "speaking-btn" : ""}
    >
      {name}
    </Button>
  );
};

const cardSelectionOptions: React.FC<{
  categorySetter: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ categorySetter }) => {
  return (
    <Wrapper>
      <div style={{ width: "100%" }} onClick={() => categorySetter(null)}>
        <PanelButton name="Recommended" option="recommended" />
      </div>
      <div style={{ width: "100%" }}>
        <PanelButton name="Categories" option="categories" />
      </div>
      <div style={{ width: "100%" }} onClick={() => categorySetter(null)}>
        <PanelButton name="Add new image" option="generate" />
      </div>
    </Wrapper>
  );
};

export default cardSelectionOptions;
