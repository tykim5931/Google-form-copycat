import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { Radio, Checkbox } from '@mui/material';

import { questionOptionAdd, questionOptionMod, questionSelectedMod, questionOptionDelete} from "../feature/question/questionSlice";
import "./style.css"
import React from 'react';


interface QuestionProps {
  type: number;    // 0 = 단답형, 1 = 장문형
  questionId: string;
  optionId: number;
  optionContent: string;
  isLast: boolean;
  isAnswer?: boolean;
}

const Optional = ({ type, questionId, optionId, optionContent, isLast ,isAnswer }: QuestionProps) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    const questions = useSelector((state:RootState) => state.questions)
    const question = questions.find((item) => item.id === questionId);
    if (!question) return null;

    const onOptionAdd = () => {
        isLast && dispatch(questionOptionAdd({ id: questionId, optionId }));
    };
    const onOptionMod = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(questionOptionMod({ id: questionId, optionId, content: e.target.value }));
    };
    const onOptionDelete = () => {
        dispatch(questionOptionDelete({ id: questionId, optionId }));
    };

    const showOptionButton = () => {
        switch (type) {
            case 2: // 객관식
                return (
                    <Radio 
                     disabled={isPreview? false : true}
                     onClick={() => dispatch(questionSelectedMod({id: questionId, optionId, isAnswer, isOne: true}))}
                     value={String(optionId)}
                     checked={isEdit? false : isAnswer}
                    />
                )
            case 3: // 체크박스
                return (
                    <Checkbox 
                        disabled={isPreview? false : true}
                        onClick={() => dispatch(questionSelectedMod({id: questionId, optionId, isAnswer, isOne: false}))}
                        value={String(optionId)}
                        checked={isEdit? false : isAnswer}
                    />
                )
            case 4: 
                return <div className = "dropdown-option">{optionId}</div>

            default:
                return;
        }
    }

    const optionStyle = () => {
        if(isLast) return {color:"grey"}
        return {color:"black"}
    }
    return (
        <>
        <div className="flexContainer">
            {showOptionButton()}
            {isEdit ? (
                <input
                    type="text"
                    value={optionContent}
                    onChange={onOptionMod}
                    onClick={onOptionAdd}
                    style={optionStyle()}
                />
            ) : ( // if result/previewpage
                <div className='previewOption'>{optionContent}</div>
            )}
            {(!isLast && isEdit) &&
            <button 
                id="cancelBtn"
                onClick={onOptionDelete}>
                <img src={require("../assets/cancel_icon.png")} />
            </button>} 
        </div>
        </>
    );
};

export default Optional;