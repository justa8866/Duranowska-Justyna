import styled from "styled-components";

export const SingleProduct = styled.div`
  color: var(--black);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: auto;
  a {
    text-decoration: none;
  }
  a:link,
  a:visited {
    color: var(--black);
  }

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;
export const ImageContainer = styled.div`
  width: 100%;
  height: 100%:
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const Image = styled.div`
  width: 100%;
  height: 338px;
  max-height: 338px;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #8d8f9a;
  text-transform: uppercase;
`;

export const OverlayImage = styled(Image)`
  opacity: 0.7;
`;

export const Name = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: var(--black);
  text-decoration: none;
`;

export const OutOfStockName = styled(Name)`
  opacity: 0.7;
`;

export const Price = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: var(--black);
  text-decoration: none;
`;

export const OutOfStockPrice = styled(Price)`
  opacity: 0.7;
`;

export const Trolley = styled.img`
  width: 40px;
  height: 40px;
`;

export const Background = styled.div`
  background-color: var(--green);
  border-radius: 50%;
  padding: 6px;
  z-index: 3;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 92%;
  left: 60%;
  visibi &:hover {
    cursor: pointer;
  }

  ${SingleProduct}:hover & {
    display: flex;
  }
`;
