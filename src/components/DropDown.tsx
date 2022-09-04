import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { questionSelectedMod, questionTypeMod } from '../feature/question/questionSlice';
import "./style.css";

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
    const questions = useSelector((state:RootState) => state.questions)

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
        // if preview or result, show selectedAns
        return questionType
    }

  return (
    <>
    <ThemeProvider theme={theme}>
        <Select 
            onChange={onTypeChanged}
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