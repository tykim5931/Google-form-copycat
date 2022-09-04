import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { RootState } from '../../app/store';
import { questionAdd } from '../question/questionSlice';
import './style.css'


interface OptionProps {
  id: number;
  content : string;
}


const SideBar = () => {
  const dispatch = useDispatch()
  
  const onNewQuestionClicked = () => {
    const newQuestion = {
      id: nanoid(),
      type: 0,
      isnecessary: false,
      ask: '',
      answer: '',
      options: [{id:1, content:'옵션1'}],
      selected: [],
    }
    dispatch(questionAdd(newQuestion))
  }

  return (
    <div className="floatingContainer">
      <button
        onClick={onNewQuestionClicked}
      >
        <img src={require("../../assets/add_icon.png")} />
      </button>
      <Link to="/preview">
          <button><img src={require("../../assets/preview_icon.png")} /></button>
      </Link>
    </div>
  );
};


export default SideBar;
