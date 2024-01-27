import styled from "styled-components";

export const NavbarContainer = styled.div`
  height: 80px;
  background-color: #fff;

  a {
    text-decoration: none;
  }

  a:link,
  a:visited {
    color: var(--black);
  }
`;

export const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const LeftContainer = styled.div`
  display: flex;
  height: 100%;
  flex-basis: calc(100% / 3);
  line-height: 80px;
`;
export const Category = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  height: 100%;
  text-align: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;

  &:hover {
    border-bottom: 2px solid #5ece7b;
    color: var(--green);
    font-weight: 600;
    cursor: pointer;
  }
`;

export const ActiveCategory = styled(Category)`
  border-bottom: 2px solid var(--green);
  color: var(--green);
  font-weight: 600;
  cursor: pointer;
`;

export const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  flex-basis: calc(100% / 3);
  justify-content: center;
  align-items: center;
`;

export const Bag = styled.img`
  cursor: pointer;
  max-width: 31px;
  height: 29px;
`;

export const RightContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-basis: calc(100% / 3);
  height: 100%;
  align-items: center;
  position: relative;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  position: relative;
`;
