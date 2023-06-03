import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.7em 2em;
  border: none;
  background: #e1e1e1;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;

const withButton = (WrappedComponent: any) => {
  const EnhancedComponent = (props: any) => {
    // Add any additional functionality or state you need for the button here

    const handleClick = () => {
      // Handle button click logic here
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };

  return EnhancedComponent;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

type ButtonComponentProps = React.ComponentProps<typeof StyledButton> &
  ButtonProps;

const Button: React.FC<ButtonComponentProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
