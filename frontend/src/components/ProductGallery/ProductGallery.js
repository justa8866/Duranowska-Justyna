import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 20% 80%;

  @media (max-width: 1250px) {
    grid-template-columns: 25% 75%;
  }
`;

export const ChoiceContainer = styled.div`
  margin-right: 30px;
  max-height: 600px;
  overflow-y: auto;
`;

export const ImageContainer = styled.div``;

export const ImageSmall = styled.img`
  max-width: 100%;
  max-height: 100px;
  margin-bottom: 35px;
  &:not(:last-of-type) {
    margin-bottom: 35px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ImageCenterContainer = styled.div`
  align-items: flex-start;
  justify-content: center;
  display: flex;
  margin-right: 80px;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 600px;
  display: block;
  cursor: pointer;
`;
