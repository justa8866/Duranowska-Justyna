import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0px auto;
  padding-top: 60px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 60% 40%;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
`;

export const DescriptionContainer = styled.div`
  margin-right: 150px;
  color: var(--black);
`;

export const Name = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 15px;
`;

export const Text = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 40px;
`;

export const Description = styled.div`
  width: 100%;
  display: inline-block;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.96%;
  margin-top: 40px;
`;

export const Price = styled.div`
  font-weight: 600;
  margin-top: 35px;
`;

export const PriceValue = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  margin-bottom: 30px;
  margin-top: 15px;
`;

export const StandardText = styled.div`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  text-transform: uppercase;
`;
