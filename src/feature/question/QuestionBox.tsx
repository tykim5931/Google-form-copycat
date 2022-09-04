import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

import { questionAdd, questionAnswered, questionMod, questionDelete} from "./questionSlice";
import { Question } from './questionSlice';
import DropDown from "../../components/DropDown";
import './style.css'

interface QuestionProps {
    questionId: string;
}

const QuestionBox = ({questionId}: QuestionProps) => {
    const dispatch = useDispatch()
    const questions = useSelector((state:RootState) => state.questions)

    const question = questions.find((item) => item.id === questionId);
    if (!question) return null;

    const onAskChanged = (e:any) => {
        // dispatch ask changed
    }
    
    const onDeleteQuestion = () => {
        dispatch(questionDelete(question.id))
    }

    const onTypeChanged = (type: string): void => {
        // setSelectOption(type);
        // dispatch typechanged
    };

    const onClickSave = () => dispatch( questionMod({question}) )


    // // drop down - nav
    // const [showDropDown, setShowDropDown] = useState(false);
    // const [selectOption, setSelectOption] = useState("");

    // const questionOptions = () => {
    //     return ["단답형", "장문형", "객관식 질문", "체크박스", "드롭다운"];
    // };

    // const toggleDropDown = () => {
    //     setShowDropDown(!showDropDown);
    // };

    // const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    //     if (event.currentTarget === event.target) {
    //     setShowDropDown(false);
    //     }
    // };

    return (
        <div className="container" onClick={onClickSave} id="questionBox" key={question.id}>
            <div>
                <input 
                    type="text"
                    id="ask"
                    name="ask"
                    value={question.ask}
                    placeholder="질문"
                    onChange={onAskChanged}
                />
                {/* <button
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
                        optionSelection={onTypeChanged}
                    />
                    )}
                </button> */}
            </div>

            <br></br>
            <button 
                id="deleteBtn"
                onClick={onDeleteQuestion}>
                <img src={require("../../assets/delete_icon.png")} />
            </button>

        </div>
    )
}


export default QuestionBox;