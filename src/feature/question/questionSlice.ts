import {createSlice, nanoid} from "@reduxjs/toolkit"

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
    options: [{id:0, content:'옵션1'}],
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
        questionAnswered(state, action) {
            const answeredQuest: Question = action.payload;
            // state[answeredQuest.index] = answeredQuest;
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
            const {id, optionId, isSelected} = action.payload;
            const question = state.find(item => item.id === id);
            if (!question) return;
            question.selected.length > 0 && question.selected.splice(-1, 1); // clear selected
            if (!isSelected) {
              question.selected.push(optionId);
            }
        },
    }
})

export const { questionAdd, questionAnswered, questionAskMod, questionDelete, questionTypeMod, questionSelectedMod} = questionSlice.actions;

export default questionSlice.reducer;