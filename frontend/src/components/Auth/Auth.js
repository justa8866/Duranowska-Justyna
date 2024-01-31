import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
`;

export const StyledButton = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: var(--green);
  color: var(--black);
`;
