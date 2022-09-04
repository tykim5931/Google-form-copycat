import React, { useState } from "react";
import DropDown from "./DropDown";
import "./style.css"

const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const questionOptions = () => {
    return ["단답형", "장문형", "객관식 질문", "체크박스", "드롭다운"];
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the
   * Option name from the child component
   *
   * @param Option  The selected Option
   */
  const optionSelection = (option: string): void => {
    setSelectOption(option);
  };

  return (
    <>
      <button
        id="optionBtn"
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>{selectOption ? selectOption : questionOptions()[0]} </div>

        {showDropDown && (
          <DropDown
            options={questionOptions()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            optionSelection={optionSelection}
          />
        )}

      </button>
    </>
  );
};

export default Menu;
