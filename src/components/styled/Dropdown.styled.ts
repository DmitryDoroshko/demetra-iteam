import styled from "styled-components/macro";

export const DropdownWrapperStyled = styled.div`
  display: flex;
  min-height: 3.8rem;
  flex-wrap: wrap;
  position: relative;
`;

export const DropdownHeaderStyled = styled.div`
  border-radius: 4px;
  border: none;
  background-color: #837F7F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  width: 100%;
  font-size: 1.4rem;
  padding: ${({padding}: {padding: string;}) => padding};
  position: relative;
`;

export const DropdownListStyled = styled.ul`
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
  padding: 0;
  margin: 2rem 0 0 0;
  min-width: 100%;
  position: absolute;
  top: 3rem;
  z-index: 1000;
  
  li {
    list-style-type: none;
    
    &:first-of-type {
      > button {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }

    &:last-of-type > button {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: ${({gap}: {gap?: string}) => gap || "2rem"};
      background-color: #837F7F;
      color: white;
      font-size: 14px;
      padding: 10px 18px;
      border: 0;
      width: 100%;
      text-align: left;

      &:hover, &:focus {
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
`;