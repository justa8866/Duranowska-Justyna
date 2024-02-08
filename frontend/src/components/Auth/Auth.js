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

  input {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
  }
`;

export const StyledButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: var(--green);
  color: var(--black);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
