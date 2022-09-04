import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

import { questionAdd, questionAnswered, questionAskMod, questionDelete} from "./questionSlice";
import { Question } from './questionSlice';
import Dropdown from "../../components/Dropdown";
import './style.css'


const options = [
    { id: 0, content: '단답형' },
    { id: 1, content: '장문형' },
    { id: 2, content: '객관식 질문'},
    { id: 3, content: '체크박스'},
    { id: 4, content: '드롭다운'},
  ];


interface QuestionProps {
    questionId: string;
}

const QuestionBox = ({questionId}: QuestionProps) => {
    const dispatch = useDispatch()
    const questions = useSelector((state:RootState) => state.questions)

    const question = questions.find((item) => item.id === questionId);
    if (!question) return null;

    const onAskChanged = (e:any) => {
        dispatch(questionAskMod({ id: question.id, ask: e.target.value }))
    }
    
    const onDeleteQuestion = () => {
        dispatch(questionDelete(question.id))
    }

    const onTypeChanged = (type: string): void => {
        // setSelectOption(type);
        // dispatch typechanged
    };


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
        <div className="container" id="questionBox" key={question.id}>
            <div>
                <input 
                    type="text"
                    id="ask"
                    name="ask"
                    value={question.ask}
                    placeholder="질문"
                    onChange={onAskChanged}
                />
                <Dropdown questionId={questionId} options={options} />
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