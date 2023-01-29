import styled from "styled-components/macro";

export const GameInfoStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, min-content);
  padding: .6rem 1rem;
  gap: 1rem;
  
  & > *:nth-child(1) {
    grid-column: 1 / -1;
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.2rem;
    letter-spacing: 0;
    text-align: left;
  }
  
  & > *:nth-child(2) {
    grid-column: 1 / -1;
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.8rem;
    letter-spacing: 0;
    text-align: left;
  }
  
  & > *:nth-child(3) {
    grid-column: 1 / 2;
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7rem;
    letter-spacing: 0;
    text-align: left;
  }

  & > *:nth-child(4) {
    background-color: transparent;
    border: none;
    cursor: pointer;
    grid-column: 2 / -1;
    justify-self: end;
  }
`;

export const GameFullInfoStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, min-content);
  padding: .6rem 1rem;
  gap: 1rem;

  & > *:nth-child(1) {
    grid-column: 1 / -1;
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.2rem;
    letter-spacing: 0;
    text-align: left;
  }

  & > *:nth-child(2) {
    grid-column: 1 / -1;
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.8rem;
    letter-spacing: 0;
    text-align: left;
  }

  & > *:nth-child(3) {
    grid-column: 1 / 2;
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7rem;
    letter-spacing: 0;
    text-align: left;
  }

  & > *:nth-child(3) {
    grid-column: 1 / 2;
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7rem;
    letter-spacing: 0;
    text-align: left;
  }

  & > *:nth-child(4) {
    grid-column: 1 / -1;
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7rem;
    letter-spacing: 0;
    text-align: left;
  }

  & > *:nth-child(5) {
    grid-column: 1 / span 1;
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7rem;
    letter-spacing: 0;
    text-align: left;
    text-decoration: none;
    transition: all 0.3s;
    color: aqua;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  
  & > button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    grid-column: 2 / -1;
    justify-self: end;
  }
  
  & > img {
    
  }
`;