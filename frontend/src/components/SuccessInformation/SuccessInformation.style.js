import styled from 'styled-components';

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SuccessTitle = styled.h2`
  color: #28a745;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const SuccessMessage = styled.p`
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 10px;
`;
