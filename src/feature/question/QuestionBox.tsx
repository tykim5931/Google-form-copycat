import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Switch } from '@mui/material';
import { RootState } from '../../app/store';
import { DraggableProvided } from 'react-beautiful-dnd';

import { questionAskMod, questionDelete, questionCopy, questionNecessary} from "./questionSlice";
import {Narrative, Optional} from '../../components';
import Dropdown from "../../components/Dropdown";
import'../../index.css';
import './style.css';
import { QUESTIONTYPES } from '../featureTypes';
import React from 'react';


interface QuestionProps {
    questionId: string;
    provided: DraggableProvided;
}

const QuestionBox = ({questionId, provided}: QuestionProps) => {
    const dispatch = useDispatch()

    // =========== Find HREF Location ================
    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    // ============== Render QuestionBox ===============
    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find((item) => item.id === questionId);
    if (!question) return null;

    // ============= Event Handlers ==================
    const onAskChanged = (e : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(questionAskMod({ id: question.id, ask: e.target.value }))
    }
    const onDeleteQuestion = () => {
        dispatch(questionDelete(question.id))
    }
    const onCopyQuestion = () => {
        dispatch(questionCopy(question.id))
    }
    const onNecessarySwitch = () => {
        dispatch(questionNecessary(questionId));
    }

    // ============ QuestionBox generator ============
    const getQuestionBox = () => {
        switch (question.type){
            case 0: // 단답형
                return <Narrative type={0} id={questionId} />
            case 1: // 장문형
                return <Narrative type={1} id={questionId} />
            case 2: // 객관식
            case 3: // 체크박스
            case 4: // 드롭다운
                return optionComp(question.type)
            default:
                return;
        }
    }

    const questionOptions = question.options;
    const selectedOptions = question.selected;
    
    const getSelectedItem = () => {
        const selectedId: number = selectedOptions[0];
        const optionContent = questionOptions.find(item => item.id === selectedId);
        if (optionContent === undefined) return "";
        return optionContent.content;
    }

    const optionComp = (type: 2|3|4) => {
        let optionList = questionOptions?.map( option => (
            <Optional 
                key={option.id}
                id={questionId}
                type={type}
                thisOption={{
                    optionId:option.id, 
                    optionContent: option.content,
                    isLast: false,
                }}
                isAnswer={selectedOptions.find(item => item === option.id) !==undefined}
            />
        ))
        if(isEdit){ // 편집페이지를 위해 옵션추가부분 추가
            optionList = optionList.concat(
                <Optional
                    key={questionOptions.length + 1}
                    id={questionId}
                    type={type}
                    thisOption={{
                        optionId:questionOptions.length + 1, 
                        optionContent:"옵션 추가",
                        isLast: true,
                    }}
                    isAnswer={false}
                />,
            );
        }
        switch (type) {
            case 2:     // 객관식
            case 3:     // 체크박스
                return optionList;
            case 4: {   // Dropdown
                if (isPreview) return(
                    <div className="answerBox">
                        <Dropdown id={questionId} options={question.options} />
                    </div>
                )
                if (isResult) return
                    <div>{getSelectedItem()}</div>
                return optionList
            }
            default:
                return optionList
        }
    };

    return (
        <div className="container" id="questionBox" key={question.id}>
            <div className='handler' {...provided.dragHandleProps}>
                {isEdit && <img src={require("../../assets/drag_icon.png")} alt="" />}
            </div>
            <div className="flexContainer">
                {(isPreview && question.isnecessary) && <p style={redfontStyle}>*</p>}
                <input 
                    type="text"
                    id="ask"
                    name="ask"
                    value={question.ask}
                    placeholder="질문"
                    onChange={onAskChanged}
                    disabled={isPreview || isResult ? true : false}
                />
                {isEdit && <Dropdown id={questionId} options={QUESTIONTYPES} />}
            </div>
                {getQuestionBox()}
                <br></br>
                {isEdit && 
                <div className='btnBarContainer'>
                    <button 
                        id="deleteBtn"
                        onClick={onDeleteQuestion}>
                        <img src={require("../../assets/delete_icon.png")} />
                    </button>
                    <button 
                        id="copyBtn"
                        onClick={onCopyQuestion}>
                        <img src={require("../../assets/copy_icon.png")} />
                    </button>
                    <p>필수</p>
                    <Switch className="switch" checked={question.isnecessary} onChange={onNecessarySwitch} />
                </div>
                }
        </div>
    )
}

const redfontStyle = {
    color: "red"
}

export default React.memo(QuestionBox);