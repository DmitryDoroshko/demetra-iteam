import React, {useState} from 'react';
import {DropdownHeaderStyled, DropdownWrapperStyled, DropdownListStyled} from "./styled/Dropdown.styled";
import ArrowDownIcon from "./Icons/ArrowDownIcon";
import ArrowUpIcon from "./Icons/ArrowUpIcon";
import {ImageStyled} from './styled/Image.styled';
import useComponentVisible from "../hooks/useComponentVisible";

export interface IDropdownItem {
  id: number;
  value: string;
  label: string;
  icon?: string | null;
}

interface IDropdown {
  items: IDropdownItem[];
  onDropdownValueChange: (valueOfDropdown: any) => void;
  title?: string;
  multiSelect?: boolean;
  icon?: string | null;
  padding?: string;
}

function Dropdown({title, items, icon = null, multiSelect = false, padding = "0", onDropdownValueChange}: IDropdown) {
  const [open, setOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<IDropdownItem[]>([items[0] || title]);
  const {
    ref: dropdownRef,
    isComponentVisible: isDropdownVisible,
    setIsComponentVisible: setIsDropdownVisible
  } = useComponentVisible(false);

  const toggle = (toggleValue: boolean) => {
    setOpen(toggleValue);
    setIsDropdownVisible(toggleValue);
  };

  function handleOnClick(item: IDropdownItem) {
    // Check for the uniqueness
    // if we don't have the item already, go ahead and add the item
    // else remove the item from selection
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        onDropdownValueChange(item.value);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      // if only one item is selected, do not remove it
      if (!(selection.length === 1)) {
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
            current => current.id !== item.id
        );
        setSelection([...selectionAfterRemoval]);
      }
      // close the dropdown
      toggle(false);
    }
  }

  function isItemInSelection(item: IDropdownItem) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
      <DropdownWrapperStyled>
        <DropdownHeaderStyled
            tabIndex={0}
            role="button"
            onClick={() => {
              toggle(!open);
            }}
            padding={padding}
        >
          {icon && <ImageStyled src={icon}/>}
          {!icon && (
              <>
                <p>{selection[0].label}</p>
                <p>{open ? <ArrowUpIcon/> : <ArrowDownIcon/>}</p>
              </>
          )}
        </DropdownHeaderStyled>
        {open && isDropdownVisible && (
            <DropdownListStyled ref={dropdownRef}>
              {items.map(item => (
                  <li key={item.id}>
                    <button type="button" onClick={() => handleOnClick(item)}
                            style={{
                              fontWeight: isItemInSelection(item) ? "bold" : "normal",
                              opacity: isItemInSelection(item) ? "1" : "0.75"
                            }}>
                      <span>{item.label}</span>
                      {item.icon ? <img src={item.icon} alt={`Icon of ${item.value}`}/> : null}
                    </button>
                  </li>
              ))}
            </DropdownListStyled>
        )}
      </DropdownWrapperStyled>
  );
}

export default Dropdown;
