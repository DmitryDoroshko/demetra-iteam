import styled from "styled-components/macro";

export const InputStyled = styled.input`
  background: #837F7F;
  border-radius: 1rem;
  outline: none;
  border: none;
  padding: 1.1rem .6rem .8rem 1.5rem;
  cursor: text;
  pointer-events: auto;
  color: white;
  
  &::placeholder {
    font-family: "Inter", sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5px;
    text-align: left;
    color: white;
  }
`;

export const InputSearchStyled = styled(InputStyled)`
  width: 100%;
`;