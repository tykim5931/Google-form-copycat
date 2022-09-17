import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { Radio, Checkbox } from '@mui/material';

import { questionOptionAdd, questionOptionMod, questionSelectedMod, questionOptionDelete} from "../feature/question/questionSlice";
import "./style.css"
import React from 'react';
import { Question } from '../feature/interfaces';


const Optional = ({ type, id, thisOption ,isAnswer }: 
                    Pick<Question,'type'|'id'|'thisOption' |'isAnswer'>) => {
    const dispatch = useDispatch()

    // define this page (편집, 미리보기, 결과)
    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    // find question from question state
    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find(item => item.id === id);
    if (!question) return null;

    // unpack this option info
    if (!thisOption) return null;
    const {optionId, optionContent, isLast} = thisOption;

    const onOptionAdd = () => {
        isLast && dispatch(questionOptionAdd({ id: id, optionId }));
    };
    const onOptionMod = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(questionOptionMod({ id: id, optionId, content: e.target.value }));
    };
    const onOptionDelete = () => {
        dispatch(questionOptionDelete({ id: id, optionId }));
    };

    const showOptionButton = () => {
        switch (type) {
            case 2: // 객관식
                return (
                    <Radio 
                     disabled={isPreview? false : true}
                     onClick={() => dispatch(questionSelectedMod({id: id, optionId, isAnswer, isOne: true}))}
                     value={String(optionId)}
                     checked={isEdit? false : isAnswer}
                    />
                )
            case 3: // 체크박스
                return (
                    <Checkbox 
                        disabled={isPreview? false : true}
                        onClick={() => dispatch(questionSelectedMod({id: id, optionId, isAnswer, isOne: false}))}
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