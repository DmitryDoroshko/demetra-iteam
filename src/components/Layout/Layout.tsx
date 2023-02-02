import React, {FC} from "react";
import {ContainerStyled} from "../styled/Container.styled";
import {FooterStyled} from "../styled/Footer.styled";
import Header from "../Header";
import {DivCenteredVerticallyStyled} from "../styled/DivCenteredVertically.styled";

type LayoutProps = {
  children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

const Layout: FC<LayoutProps> = ({children}: LayoutProps): JSX.Element => {
  return (
      <ContainerStyled>
        <Header/>
        <DivCenteredVerticallyStyled>{children}</DivCenteredVerticallyStyled>
        <FooterStyled>
          Demetra ITeam App made by <a target="_blank" href="https://t.me/DmytroDoroshko">Dmytro Doroshko</a>
        </FooterStyled>
      </ContainerStyled>
  );
};

export default Layout;