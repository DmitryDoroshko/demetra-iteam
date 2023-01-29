import React, {FC, FormEvent, useEffect, useState} from "react";
import {HeaderStyled} from "./styled/Header.styled";
import {NavStyled} from "./styled/Nav.styled";
import {ImageStyled} from "./styled/Image.styled";
import {FormStyled} from "./styled/Form.styled";
import {InputSearchStyled} from "./styled/Input.styled";
import {HeaderFlexStyled} from "./styled/Flex.styled";
import {ButtonActionStyled, ButtonSearchStyled} from "./styled/Button.styled";
import {ActionsStyled} from "./styled/Actions.styled";
import mainSteamLogo from "../assets/icons/steamMainLogo.png";
import searchIcon from "../assets/icons/searchIcon.svg";
import Dropdown, {IDropdownItem} from "./Dropdown";
import priceIcon from "../assets/icons/priceIcon.png";
import publishDateIcon from "../assets/icons/publishDateIcon.png";
import optionsIcon from "../assets/icons/optionsIcon.png";
import {useDebounce} from "../hooks/useDebounce";
import {useAppDispatch} from "../hooks/redux-hooks";
import {fetchGamesByGameNameThunk} from "../store/games/gamesSlice";

interface IHeaderProps {
}

const orderDropdownItems: IDropdownItem[] = [
  {
    id: 1,
    value: 'Lower to bigger',
    icon: null,
  },
  {
    id: 2,
    value: 'Bigger to lower',
    icon: null,
  },
];

const sortingDropdownItems: IDropdownItem[] = [
  {
    id: 1,
    value: 'Price',
    icon: priceIcon,
  },
  {
    id: 2,
    value: 'Publish Date',
    icon: publishDateIcon,
  },
];

const Header: FC<IHeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const [searchGamesInputValue, setSearchGamesInputValue] = useState<string>("");
  const debouncedSearchGamesInputValue: string = useDebounce<string>(searchGamesInputValue, 1000);

  useEffect(() => {
    if (debouncedSearchGamesInputValue) {
      dispatch(fetchGamesByGameNameThunk({gameName: debouncedSearchGamesInputValue}));
    }
  }, [debouncedSearchGamesInputValue]);

  const handleSetSearchGamesInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchGamesInputValue(event.target.value);
  };

  const handleSearchFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchGamesByGameNameThunk({gameName: debouncedSearchGamesInputValue}));
  };

  return (
      <HeaderStyled>
        <NavStyled>
          <HeaderFlexStyled justify={"center"} direction={"row"} align={"center"} wrap={"nowrap"}>
            <ImageStyled src={mainSteamLogo}/>
            <FormStyled onSubmit={handleSearchFormSubmit}>
              <InputSearchStyled placeholder={"Enter an app name..."}
                                 value={searchGamesInputValue}
                                 onChange={handleSetSearchGamesInputValue}/>
              <ButtonSearchStyled>
                <ImageStyled src={searchIcon}/>
              </ButtonSearchStyled>
            </FormStyled>
            <Dropdown items={orderDropdownItems} icon={optionsIcon} multiSelect={false}/>
            <Dropdown title={"Price"} items={sortingDropdownItems} multiSelect={false} padding={".2rem 1.8rem"}/>
            <ActionsStyled>
              <ButtonActionStyled>
                Search
              </ButtonActionStyled>
              <ButtonActionStyled>
                Like list
              </ButtonActionStyled>
            </ActionsStyled>
          </HeaderFlexStyled>
        </NavStyled>
      </HeaderStyled>
  );
};

export default Header;