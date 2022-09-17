import {createSlice, nanoid} from "@reduxjs/toolkit"
import { Question } from "../interfaces";


const initialState: {isComplete:boolean, questionList:Question[]} = {
    isComplete: true,
    questionList: [{
        id: nanoid(),
        type: 0,
        isnecessary: false,
        ask: '',
        answer: '',
        options: [{id:1, content:'옵션1'}],
        selected: [],
    }]
};

export const questionSlice = createSlice ({
    name: 'questions',
    initialState,
    reducers:{
        questionInit(state, action) {
            while(state.questionList.length >0) state.questionList.pop();
            state.questionList.push({
                id: nanoid(),
                type: 0,
                isnecessary: false,
                ask: '',
                answer: '',
                options: [{id:1, content:'옵션1'}],
                selected: [],
            })
        },
        questionAdd(state, action) {    // new!
            const newQuestion = action.payload as Question;
            if(newQuestion.isnecessary === true) {state.isComplete = false}
            state.questionList.push(newQuestion);
        },
        questionDelete(state, action){
            const deletionid: string = action.payload;
            let necessaryCount = 0;
            state.questionList.forEach((question, idx) => {
                if (question.isnecessary) {
                  if ((question.type > 1 && question.selected.length === 0) || 
                      (question.type <= 1 && question.answer==="")){
                        necessaryCount ++;
                  }
                }
            })
            if(necessaryCount !== 0) state.isComplete = false;
            else state.isComplete = true;

            return {isComplete: state.isComplete, questionList: state.questionList.filter(item => item.id !== deletionid)}
        },
        questionCopy(state, action){
            const copyid: string = action.payload;
            const original = state.questionList.find(item => item.id === copyid)!;
            if (typeof original === undefined) return;

            const newQuestion: Question = {...original};
            newQuestion.id = nanoid();
            if (typeof newQuestion !== undefined) state.questionList.push(newQuestion);
        },
        questionAskMod(state, action){
            const {id, ask} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && (question.ask = ask);
        },
        questionTypeMod(state, action){
            const {id, type} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && (question.type = type);
        },
        questionSelectedMod(state, action){
            const {id, optionId, isSelected, isOne} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            if (!question) return;

            const idx = question.selected.indexOf(optionId, 0);
            if (isOne===true) (question.selected.length > 0 && (question.selected = [])); // clear selected
            if (isOne===false) {
                if(idx >-1) question.selected.splice(idx, 1);
            }
            if (!isSelected && idx === -1) {
              question.selected.push(optionId);
            }

            if(question?.isnecessary && question.selected.length===0) state.isComplete = false;
            else if(question?.isnecessary){
                state.isComplete=true;
                state.questionList.forEach((question, idx) => {
                    if (question.isnecessary) {
                    if ((question.type > 1 && question.selected.length === 0) || 
                        (question.type <= 1 && question.answer==="")){
                            state.isComplete=false;
                            return;
                    }
                    }
                })
            }
        },
        questionAnswerMod(state, action){
            const {id, answer} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && (question.answer = answer);
            if(question?.isnecessary && answer==="") state.isComplete = false;
            else if(question?.isnecessary){
                state.isComplete=true;
                state.questionList.forEach((question, idx) => {
                    if (question.isnecessary) {
                    if ((question.type > 1 && question.selected.length === 0) || 
                        (question.type <= 1 && question.answer==="")){
                            state.isComplete=false;
                            return;
                    }
                    }
                })
            }
        },
        questionOptionAdd(state, action){
            const {id, optionId} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && question.options.push({id: optionId, content:'옵션'+ String(optionId)})
        },
        questionOptionMod(state, action){
            const { id, optionId, content } = action.payload;
            const questionId = state.questionList.findIndex((item) => item.id === String(id));
            const optionIdx = state.questionList[questionId].options.findIndex((item) => item.id === Number(optionId));
            state.questionList[questionId].options[optionIdx].content = content;
        },
        questionOptionDelete(state, action){
            const { id, optionId } = action.payload;
            const questionId = state.questionList.findIndex((item) => item.id === String(id));
            const optionIdx = state.questionList[questionId].options.findIndex((item) => item.id === Number(optionId));
            if(optionIdx > -1) state.questionList[questionId].options.splice(optionIdx, 1);
            state.questionList[questionId].options.map((item, i) => item.id = i+1)
        },
        questionNecessary(state, action){
            const id = action.payload;
            const questionId = state.questionList.findIndex((item) => item.id === String(id));
            state.questionList[questionId].isnecessary = !state.questionList[questionId].isnecessary; // switch necessary
            // check isComplete
            let necessaryCount = 0;
            state.questionList.forEach((question, idx) => {
                if (question.isnecessary) {
                  if ((question.type > 1 && question.selected.length === 0) || 
                      (question.type <= 1 && question.answer==="")){
                        necessaryCount ++;
                  }
                }
            })
            if(necessaryCount !== 0) state.isComplete = false;
            else state.isComplete = true;
        },
        questionAnswerInit(state, action){
            state.questionList.map(item => {
                item.answer = '';
                item.selected = [];
            })
            // check isComplete
            let necessaryCount = 0;
            state.questionList.forEach((question, idx) => {
                if (question.isnecessary) {
                  if ((question.type > 1 && question.selected.length === 0) || 
                      (question.type <= 1 && question.answer==="")){
                        necessaryCount ++;
                  }
                }
            })
            if(necessaryCount !== 0) state.isComplete = false;
            else state.isComplete = true;
        },
        questionReorder: (state, action) => {
            const { firstIdx, secondIdx } = action.payload;
            const [removed] = state.questionList.splice(firstIdx, 1);
            state.questionList.splice(secondIdx, 0, removed);
        },
        questionCompleteCheck: (state) =>{
            state.isComplete=true;
            state.questionList.forEach((question, idx) => {
                if (question.isnecessary) {
                  if ((question.type > 1 && question.selected.length === 0) || 
                      (question.type <= 1 && question.answer==="")){
                        state.isComplete=false;
                        console.log(state.isComplete)
                        return;
                  }
                }
            })
        }
    }
})

export const { questionAdd, questionAskMod, questionCopy, 
                questionDelete, questionTypeMod, questionSelectedMod, 
                questionAnswerMod, questionOptionAdd, questionOptionMod,
                questionOptionDelete, questionNecessary, questionAnswerInit,
                questionInit, questionReorder, questionCompleteCheck
            } = questionSlice.actions;

export default questionSlice.reducer;