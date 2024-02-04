import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  text-align: left;
  font-family: Raleway;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
`;

export const Hr = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid var(--hr);
  margin: 1em 0;
  padding: 0;
`;

export const BoldText = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
`;

export const Button = styled.button`
  @media (max-width: 1250px) {
    width: 50%;
  }
  width: 28%;
  height: 52px;
  border: none;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  font-family: "Raleway";
  font-weight: 600;
  font-size: 16px;
  color: var(--basicWhite);
  background: var(--green);
  margin-top: 15px;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const FirstRow = styled.div``;

export const Row = styled.div`
  width: 10%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
`;

export const LastRow = styled.div`
  margin-top: 24px;
`;
