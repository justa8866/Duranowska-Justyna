import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0px auto;
`;
export const MainText = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 160%;
  text-transform: capitalize;
  padding-top: 70px;
`;

export const ListOfProducts = styled.div`
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
