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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ErrorText = styled.div`
  color: red;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: var(--green);
  color: white;
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

export const CardContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: var(--green);
  }
`;

export const LabelCard = styled.label`
  margin-bottom: 8px;
  display: block;
  font-family: "Raleway";
  font-size: 14px;
  color: #333;
`;
