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


const options = [
    { id: 0, content: '단답형' },
    { id: 1, content: '장문형' },
    { id: 2, content: '객관식 질문'},
    { id: 3, content: '체크박스'},
    { id: 4, content: '드롭다운'},
  ];


interface QuestionProps {
    questionId: string;
    provided: DraggableProvided;
}

const QuestionBox = ({questionId, provided}: QuestionProps) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find((item) => item.id === questionId);
    if (!question) return null;

    const onAskChanged = (e:any) => {
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


    const questionOptions = question.options;
    const selectedOptions = question.selected;

    const getSelectedItem = () => {
        const selectedId: number = selectedOptions[0];
        const optionContent = questionOptions.find(item => item.id === selectedId);
        if (optionContent === undefined) return "";
        return optionContent.content;
    }

    const optionComp = (type: number) => {
        if (type == 4) { // dropdown
            if (isPreview) return (
                <div className="answerBox">
                    <Dropdown questionId={questionId} options={question.options} />
                </div>
            )
            else if (isResult) return <div>{getSelectedItem()}</div>
        }
        let optionList = questionOptions?.map( option => (
            <Optional 
                key={option.id}
                questionId={questionId}
                optionId={option.id}
                optionContent={option.content}
                type={type}
                isLast={false}
                isAnswer={selectedOptions.find(item => item === option.id) !==undefined}
                />
        ))
        if(isEdit){
            optionList = optionList.concat(
                <Optional
                  key={questionOptions.length + 1}
                  questionId={questionId}
                  optionId={questionOptions.length + 1}
                  optionContent="옵션 추가"
                  type={type}
                  isLast={true}
                  isAnswer={false}
                />,
            );
        }
        return optionList;
    };

    const inputComp = () => {
        switch (question.type){
            case 0: // 단답형
                return <Narrative type={0} questionId={questionId} />
            case 1: // 장문형
                return <Narrative type={1} questionId={questionId} />
            case 2: // 객관식
            case 3: // 체크박스
            case 4: // 드롭다운
                return optionComp(question.type)
            default:
                return;
        }
    }

    const redfontStyle = {
        color: "red"
    }

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
                {isEdit && <Dropdown questionId={questionId} options={options} />}
            </div>
            {inputComp()}
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

export default QuestionBox;