import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { questionSelectedMod, questionTypeMod } from '../feature/question/questionSlice';
import "./style.css";
import { useLocation } from 'react-router-dom';

interface OptionProps {
    id: number;
    content : string;
}

interface DropDownProps {
    questionId : string;
    options: OptionProps[];
    isAnswer?: boolean;
};

const Dropdown = ({ questionId, options, isAnswer}: DropDownProps) => {
    const dispatch = useDispatch();
    const theme = unstable_createMuiStrictModeTheme();
    
    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find((item) => item.id === questionId);
    if (!question) return null;

    const {type: questionType, selected} = question;
    const selectedAns = selected.length > 0 ? selected[0] : '';

    const onTypeChanged = (e: any) => {
        dispatch(questionTypeMod({id: questionId, type: e.target.value}))
    }

    const onSelectedChanged = (e: any) => {
        dispatch(questionSelectedMod({id: questionId, optionId: e.target.value, isAnswer, isOne:true}))
    }

    const showValue = () => {
        if (!isEdit) {
            const selectedOption = question.options.find(item => item.id == question.selected[0]);
            // if (selectedOption === undefined) return;
            const selectedContent = selectedOption? selectedOption.id : 1;
            return selectedContent;
        }
        // if preview or result, show selectedAns
        return questionType
    }

  return (
    <>
    <ThemeProvider theme={theme}>
        <Select 
            onChange={isEdit? onTypeChanged : onSelectedChanged}
            className='dropdown'
            disabled={false}
            value={showValue()}
            >
            {options.map((option) => (
                <MenuItem key={option.id} value={option.id} className="dropdownComp">
                    <div className='menu-content'>{option.content}</div>
                </MenuItem>
            ))}
        </Select>
    </ThemeProvider>
    </>
  );
};

export default Dropdown;