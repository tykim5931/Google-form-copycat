import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

import { questionAdd } from "./questionSlice";
import QuestionBox from './QuestionBox';
import './style.css'

const QuestionList = () => {
    const dispatch = useDispatch()

    const questions = useSelector((state:RootState) => state.questions)
    const renderedQuestions = questions.map((question, idx) => (
        <article key={question.id}>
            <QuestionBox key={question.id} questionId={question.id} />
        </article>
    ))

    return (
        <section>
            {renderedQuestions}
        </section>
    );
}


export default QuestionList;