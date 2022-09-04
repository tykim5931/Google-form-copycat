import {createSlice, nanoid} from "@reduxjs/toolkit"

export interface Question {
    id: string,
    type: string,
    isnecessary: boolean;
    ask: string;
    answer: string;     // for subjective questions
    options: string[];  // for objective questions
    selected: string[];
}

const initialState: Question[] = [{
    id: nanoid(),
    type: '단답형',
    isnecessary: false,
    ask: '',
    answer: '',
    options: ['옵션1'],
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
        questionMod(state, action){
            const setQuest: Question = action.payload;
            // state[setQuest.index] = setQuest; 
            
            // const originalQ = state.find(item => item.id === setQuest.id)
            // for drag and drop => change the index =>  삽입, 제거, 리인덱싱.
        },
    }
})

export const { questionAdd, questionAnswered, questionMod, questionDelete} = questionSlice.actions;

export default questionSlice.reducer;