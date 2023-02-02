import styled from "styled-components/macro";

export const ButtonStyled = styled.button`
  background-color: #837F7F;
  border: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

export const ButtonSearchStyled = styled(ButtonStyled)`
  margin-left: -3rem;
  transform: translateY(.5rem);
  width: 2.3rem;
  height: 2.3rem;
`;

export const ButtonActionStyled = styled(ButtonStyled)`
  color: white;
  padding: 0.5rem 1.5rem;
  &:hover {
    opacity: 0.75;
  }
  
  &:first-of-type {
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  &:last-of-type {
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  
  & > a {
    color: white;
    text-decoration: none;
  }
`;