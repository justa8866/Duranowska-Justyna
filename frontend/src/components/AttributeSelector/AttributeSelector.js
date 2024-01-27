import styled from "styled-components";

export const StandardText = styled.div`
  font-style: normal;
  margin: 15px 0;
  text-transform: uppercase;
  font-weight: ${(props) => (props.small ? "400" : "700")};
  font-size: ${(props) => (props.small ? "16px" : "18px")};
  font-family: ${(props) => (props.small ? "Raleway" : "Roboto Condensed")};
`;

export const ButtonBox = styled.div`
  width: 40%;
  display: grid;
  grid-gap: 1rem;

  grid-auto-rows: 1fr;

  grid-template-columns: ${(props) =>
    props.small ? "repeat(2, 1fr)" : "repeat(4, 1fr)"};

  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Button = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  &:hover {
    background: ${(props) => (props.disableSelector ? "none" : "var(--black)")};
    color: ${(props) => (props.disableSelector ? "none" :  "var(--basicWhite)")};
    cursor: ${(props) => (props.disableSelector ? "default" :  "pointer")};
  }
  padding: ${(props) => (props.small ? "7px 10px" : "15px 30px")};
  font-weight: ${(props) => (props.small ? "500" : "600")};
  font-size: ${(props) => (props.small ? "14px" : "18px")};
`;

export const ActiveButton = styled(Button)`
  background: var(--black);
  color: var(--basicWhite);
`;

export const Color = styled.div`
  padding-bottom: 30px;
`;

export const ColorBox = styled.div`
  display: flex;
`;

export const Box = styled.div`
    padding: 10px; 
    margin-top: 10px;
    margin-right: 10px;
    justify-content: space-between;
    background: ${(props) => props.background};
    border: ${(props) =>
      props.background === "White" ? "1px solid black" : "none"};
    &:hover {
      border: ${(props) => (props.disableSelector ? props.background === "White" ? "1px solid black" : "none" :  "1px solid white")};
      outline: ${(props) => (props.disableSelector ? "none" :  "1px solid var(--green)")};
      cursor: ${(props) => (props.disableSelector ? "default" :  "pointer")};
    }

}
`;

export const ActiveBox = styled(Box)`
  border: 1px solid white;
  outline: 1px solid var(--green);
  cursor: pointer;
`;
