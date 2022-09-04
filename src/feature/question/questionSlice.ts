import {createSlice, nanoid} from "@reduxjs/toolkit"
import { type } from "os";

interface OptionProps {
    id: number;
    content : string;
}

export interface Question {
    id: string,
    type: number,
    isnecessary: boolean;
    ask: string;
    answer: string;     // for subjective questions
    options: OptionProps[];  // for objective questions
    selected: number[];
}

const initialState: Question[] = [{
    id: nanoid(),
    type: 0,
    isnecessary: false,
    ask: '',
    answer: '',
    options: [{id:1, content:'옵션1'}],
    selected: [],
}];

export const questionSlice = createSlice ({
    name: 'questions',
    initialState,
    reducers:{
        questionAdd(state, action) {    // new!
            const newQuestion = action.payload;
            state.push(newQuestion);
        },
        questionDelete(state, action){
            const deletionid: string = action.payload;
            return state.filter(item => item.id !== deletionid)
        },
        questionCopy(state, action){
            const copyid: string = action.payload;
            const original = state.find(item => item.id === copyid)!;
            // const newQuestion: Question = JSON.parse(JSON.stringify(original));
            
            if (typeof original === undefined) return;

            const newQuestion: Question = {...original};
            newQuestion.id = nanoid();
            if (typeof newQuestion !== undefined) state.push(newQuestion);
        },
        questionAskMod(state, action){
            const {id, ask} = action.payload;
            const question = state.find(item => item.id === id);
            question && (question.ask = ask);
        },
        questionTypeMod(state, action){
            const {id, type} = action.payload;
            const question = state.find(item => item.id === id);
            question && (question.type = type);
        },
        questionSelectedMod(state, action){
            const {id, optionId, isSelected, isOne} = action.payload;
            const question = state.find(item => item.id === id);
            if (!question) return;

            
            const idx = question.selected.indexOf(optionId, 0);
            if (isOne===true) (question.selected.length > 0 && (question.selected = [])); // clear selected
            if (isOne===false) {
                if(idx >-1) question.selected.splice(idx, 1);
            }
            if (!isSelected && idx === -1) {
              question.selected.push(optionId);
            }
        },
        questionAnswerMod(state, action){
            const {id, answer} = action.payload;
            const question = state.find(item => item.id === id);
            question && (question.answer = answer);
        },
        questionOptionAdd(state, action){
            const {id, optionId} = action.payload;
            const question = state.find(item => item.id === id);
            question && question.options.push({id: optionId, content:'옵션'+ String(optionId)})
        },
        questionOptionMod(state, action){
            const { id, optionId, content } = action.payload;
            const questionId = state.findIndex((item) => item.id === String(id));
            const optionIdx = state[questionId].options.findIndex((item) => item.id === Number(optionId));
            state[questionId].options[optionIdx].content = content;
        },
        questionOptionDelete(state, action){
            const { id, optionId } = action.payload;
            const questionId = state.findIndex((item) => item.id === String(id));
            const optionIdx = state[questionId].options.findIndex((item) => item.id === Number(optionId));
            if(optionIdx > -1) state[questionId].options.splice(optionIdx, 1);
            state[questionId].options.map((item, i) => item.id = i+1)
        }
    }
})

export const { questionAdd, questionAskMod, questionCopy, 
                questionDelete, questionTypeMod, questionSelectedMod, 
                questionAnswerMod, questionOptionAdd, questionOptionMod,
                questionOptionDelete
            } = questionSlice.actions;

export default questionSlice.reducer;