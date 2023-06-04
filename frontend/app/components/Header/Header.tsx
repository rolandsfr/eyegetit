import styled from "styled-components";
import Container from "../../styled/Container";
import { setLocation } from "../../redux/slices/navSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules
import { useModal } from "../Modal/Modal";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useRouter } from "next/navigation";

const Wrapper = styled.header`
  position: fixed;
  padding: 1em 0;
  background: #ebebeb;
  left: 0;
  right: 0;

  .inner-container {
    display: flex;
    gap: 1em;
    align-items: center;

    & > label {
      transform: scale(0.8);
    }
  }

  p {
    font-weight: bold;
  }
`;

const Header: React.FC = () => {
  const { mode } = useAppSelector((state) => state.navigation);
  const [modeSwitched, setModeSwitched] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSwitchChange = () => {
    setModeSwitched((mode) => !mode);
    router.push(modeSwitched ? "/speaking" : "/listening");
  };

  useEffect(() => {
    dispatch(
      setLocation({ location: modeSwitched ? "speaking" : "listening" })
    );
  }, [modeSwitched]);

  return (
    <Wrapper>
      <Container>
        <div className="inner-container">
          <p>{mode.toUpperCase()}</p>
          <Toggle
            checked={modeSwitched}
            onChange={handleSwitchChange}
            icons={false}
          />
        </div>
      </Container>
    </Wrapper>
  );
};

export default Header;
