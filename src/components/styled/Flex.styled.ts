import styled from "styled-components/macro";

type FlexProps = {
  justify?: string;
  align?: string;
  direction?: string;
  gap?: string;
  wrap?: string;
};

export const FlexStyled = styled.div`
  display: flex;
  justify-content: ${({justify}: FlexProps) => justify || "space-between"};
  flex-direction: ${({direction}: FlexProps) => direction || "row"};
  align-items: ${({align}: FlexProps) => align || "stretch"};
  flex-wrap: ${({wrap} :FlexProps) => wrap || "nowrap"};
  gap: ${({gap}: FlexProps) => gap || "1rem"};
`;

export const HeaderFlexStyled = styled(FlexStyled)`
  & > *:nth-child(1) {
    order: 1;
    @media only screen and (max-width: 50em) {
      order: 1;
    }
  }

  & > *:nth-child(2) {
    order: 2;
    @media only screen and (max-width: 50em) {
      order: 3;
      width: 50rem;
    }
    
    @media only screen and (max-width: 25em) {
      width: 30.6rem;
    } 
  }

  & > *:nth-child(3) {
    order: 3;
    @media only screen and (max-width: 50em) {
      order: 5;
    }
  }

  & > *:nth-child(4) {
    order: 4;
    @media only screen and (max-width: 50em) {
      order: 4;
    }

    @media only screen and (max-width: 25em) {
      width: 26.3rem;
    }
  }

  & > *:nth-child(5) {
    order: 5;
    @media only screen and (max-width: 50em) {
      order: 2;
    }
  }

  @media only screen and (max-width: 50em) {
    flex-wrap: wrap;
  }
`;