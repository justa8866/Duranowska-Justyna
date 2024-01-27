import styled from "styled-components";

export const Overlay = styled.div`
  filter: ${(props) =>
    props.CardListBackdropFilter ? "grayscale(80%)" : "none"};
  background-color: ${(props) =>
    props.CardListBackdropFilter ? "rgba(57, 55, 72, 0.22)" : "white"};

  width: 100%;
  height: auto;
  min-height: 100vh;
`;
