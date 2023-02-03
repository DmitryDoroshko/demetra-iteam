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
import {
  setGamesError,
  setGamesLoaded,
  setGamesLoading,
  setOrderByWhichToSort, setValueOfSortGamesBy,
  sortLoadedGames
} from "../store/games/gamesSlice";
import {gamesApi} from "../services/games.service";
import {Link} from "react-router-dom";
import {getLikedGamesFromLocalStorage} from "../utils/local-storage-helpers";
import {IGame} from "../model/games";

interface IHeaderProps {
}

const orderDropdownItems: IDropdownItem[] = [
  {
    id: 1,
    value: 'lower-to-bigger',
    label: "Lower to bigger",
    icon: null,
  },
  {
    id: 2,
    value: "bigger-to-lower",
    label: 'Bigger to lower',
    icon: null,
  },
];

const sortingDropdownItems: IDropdownItem[] = [
  {
    id: 1,
    value: 'price',
    label: 'Price',
    icon: priceIcon,
  },
  {
    id: 2,
    value: 'released',
    label: 'Publish Date',
    icon: publishDateIcon,
  },
];

const Header: FC<IHeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const [searchGamesInputValue, setSearchGamesInputValue] = useState<string>("");
  const debouncedSearchGamesInputValue: string = useDebounce<string>(searchGamesInputValue, 1000);

  const [trigger] = gamesApi.endpoints.getGamesByGameName.useLazyQuery();

  const setIsGameLikedFlagForEachOfCorrespondingLoadedGames = (loadedGames: IGame[], likedGamesFromLocalStorage: IGame[]) => {
    dispatch(setGamesLoaded(loadedGames));
    dispatch(sortLoadedGames());

    const newLoadedGames = loadedGames.map(loadedGame => {
      let newLoadedGame = loadedGame;

      likedGamesFromLocalStorage.forEach(likedGame => {
        if (likedGame.appId === newLoadedGame.appId) {
          newLoadedGame = {...newLoadedGame, gameIsLiked: true};
        }
      });

      return newLoadedGame;
    });

    dispatch(setGamesLoaded(newLoadedGames));
    dispatch(sortLoadedGames());
  };

  const gamesLoadHandler = async (searchGamesInputValue: string) => {
    dispatch(setGamesLoading(true));
    const {data, error} = await trigger(searchGamesInputValue, false);

    if (data) {
      const likedGamesFromLocalStorage = getLikedGamesFromLocalStorage();
      setIsGameLikedFlagForEachOfCorrespondingLoadedGames(data, likedGamesFromLocalStorage);
      dispatch(setGamesLoading(false));
    } else if (error) {
      dispatch(setGamesError(error?.toString() || "Unknown Error"));
      dispatch(setGamesLoading(false));
    }
  };

  useEffect(() => {
    const fetchGamesWhenDebouncedSearchGamesInputValueChanges = async () => {
      if (debouncedSearchGamesInputValue) {
        await gamesLoadHandler(debouncedSearchGamesInputValue);
      }
    };
    fetchGamesWhenDebouncedSearchGamesInputValueChanges().catch(console.error);
  }, [debouncedSearchGamesInputValue]);

  const handleSetSearchGamesInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchGamesInputValue(event.target.value);
  };

  const handleSearchFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await gamesLoadHandler(searchGamesInputValue);
  };

  const orderDropdownValueChangeHandler = (valueOfDropdown: any) => {
    dispatch(setOrderByWhichToSort(valueOfDropdown));
    dispatch(sortLoadedGames());
  };

  const sortDropdownValueChangeHandler = (valueOfDropdown: any) => {
    dispatch(setValueOfSortGamesBy(valueOfDropdown));
    dispatch(sortLoadedGames());
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
                <Link to={"/"}><ImageStyled src={searchIcon}/></Link>
              </ButtonSearchStyled>
            </FormStyled>
            <Dropdown items={orderDropdownItems} icon={optionsIcon} multiSelect={false}
                      onDropdownValueChange={orderDropdownValueChangeHandler}/>
            <Dropdown title={"Price"} items={sortingDropdownItems} multiSelect={false} padding={".2rem 1.8rem"}
                      onDropdownValueChange={sortDropdownValueChangeHandler}/>
            <ActionsStyled>
              <ButtonActionStyled>
                <Link to={"/"}>Search</Link>
              </ButtonActionStyled>
              <ButtonActionStyled>
                <Link to={"/games/liked"}>Like list</Link>
              </ButtonActionStyled>
            </ActionsStyled>
          </HeaderFlexStyled>
        </NavStyled>
      </HeaderStyled>
  );
};

export default Header;