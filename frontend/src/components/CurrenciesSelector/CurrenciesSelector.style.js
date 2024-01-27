import styled from "styled-components";

export const Dollar = styled.div`
  margin-right: 8px;
`;
export const Arrow = styled.img`
  cursor: pointer;
  width: 7px;
  height: 4px;
  margin-top: 5px;
  margin-right: 25px;
`;

export const ActiveArrow = styled(Arrow)`
  transform: rotate(180deg);
`;

export const DropdownMenu = styled.span`
  position: absolute;
  flex-direction: column;
  top: 60px;
  right: -21px;
  z-index: 9999;
  box-shadow: 0px 3px 14px -12px rgba(66, 68, 90, 1);
  display: ${(props) => (props.toggleOn ? "flex" : "none")};
`;
export const DropdownItem = styled.span`
  padding: 20px 40px 20px 20px;
  background-color: var(--basicWhite);

  &:hover {
    background-color: var(--white);
    cursor: pointer;
  }
`;
