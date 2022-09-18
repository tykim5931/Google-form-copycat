import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { Radio, Checkbox } from '@mui/material';

import { questionOptionAdd, questionOptionMod, questionSelectedMod, questionOptionDelete} from "../feature/question/questionSlice";
import "./style.css"
import React from 'react';
import { Question } from '../feature/featureTypes';


const Optional = ({ type, id, thisOption ,isAnswer }: 
                    Pick<Question,'type'|'id'|'thisOption' |'isAnswer'>) => {
    const dispatch = useDispatch()

    // =========== Find HREF Location ================
    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    // ============== Render QuestionBox ===============
    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find(item => item.id === id);
    if (!question) return null; // null check

    if (!thisOption) return null;   // null check
    const {optionId, optionContent, isLast} = thisOption;

    // ========== Event Handler ================
    const onOptionAdd = () => {
        isLast && dispatch(questionOptionAdd({ id: id, optionId }));
    };
    const onOptionMod = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(questionOptionMod({ id: id, optionId, content: e.target.value }));
    };
    const onOptionDelete = () => {
        dispatch(questionOptionDelete({ id: id, optionId }));
    };

    // ========= Optional 항목 옵션 ===========
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
                    style={optionStyle(isLast)}
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


const optionStyle = (isLast: boolean) => {
    if(isLast) return {color:"grey"}
    return {color:"black"}
}

export default Optional;