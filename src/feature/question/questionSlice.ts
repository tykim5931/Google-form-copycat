import {createSlice, nanoid} from "@reduxjs/toolkit"
import { Question } from "../featureTypes";

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
        questionAdd(state, action) {
            const newQuestion = action.payload as Question;
            if(newQuestion.isnecessary === true) {state.isComplete = false}
            state.questionList.push(newQuestion);
        },
        questionDelete(state, action){
            const deletionid: string = action.payload;
            state.isComplete=isFormFilled(state.questionList);
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
        questionAskMod(state, action){  // 항목 질문 변경
            const {id, ask} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && (question.ask = ask);
        },
        questionTypeMod(state, action){ // 항목 타입 변경
            const {id, type} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && (question.type = type);
        },
        questionSelectedMod(state, action){ // Optional 항목의 경우, 선택지 변경
            const {id, optionId, isSelected, isOne} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            if (!question) return;  // nullcheck

            const idx = question.selected.indexOf(optionId, 0);
            if (isOne===true) (question.selected.length > 0 && (question.selected = [])); // clear selected
            if (isOne===false && idx > -1) question.selected.splice(idx, 1);
            if (!isSelected && idx === -1) question.selected.push(optionId);

            if(question?.isnecessary) 
                state.isComplete=isFormFilled(state.questionList);
        },
        questionAnswerMod(state, action){   // Narrative 항목일 경우, 답변 변경
            const {id, answer} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && (question.answer = answer);
            if(question?.isnecessary) 
                state.isComplete=isFormFilled(state.questionList);
        },
        questionOptionAdd(state, action){   // Optional 항목일 경우, 자식 옵션 추가.
            const {id, optionId} = action.payload;
            const question = state.questionList.find(item => item.id === id);
            question && question.options.push({id: optionId, content:'옵션'+ String(optionId)})
        },
        questionOptionMod(state, action){   // Optional 항목일 경우, 자식옵션의 내용 변경
            const { id, optionId, content } = action.payload;
            const questionId = state.questionList.findIndex((item) => item.id === String(id));
            const optionIdx = state.questionList[questionId].options.findIndex((item) => item.id === Number(optionId));
            state.questionList[questionId].options[optionIdx].content = content;
        },
        questionOptionDelete(state, action){    // Optional 항목일 경우, 자식옵션 삭제
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
            state.isComplete = isFormFilled(state.questionList);    // check isComplete
        },
        questionAnswerInit(state, action){
            state.questionList.map(item => {
                item.answer = '';
                item.selected = [];
            })
            state.isComplete = isFormFilled(state.questionList);    // check isComplete
        },
        questionReorder: (state, action) => {
            const { firstIdx, secondIdx } = action.payload;
            const [removed] = state.questionList.splice(firstIdx, 1);
            state.questionList.splice(secondIdx, 0, removed);
        },
        questionCompleteCheck: (state) =>{
            state.isComplete=isFormFilled(state.questionList);
        }
    }
})

const isFormFilled = (questionList : Question[]) => {
    const necessaryList = questionList.filter(question => question.isnecessary)
    const unfilledList = necessaryList.filter(question => {
        // 비어있는 경우로 filter
        switch(question.type){
            case 0: case 1:
                return question.answer==="";
            case 2: case 3: case 4:
                return question.selected.length === 0;
            default:
                return true;
        }
    })
    return unfilledList.length === 0;
}

export const { questionAdd, questionAskMod, questionCopy, 
                questionDelete, questionTypeMod, questionSelectedMod, 
                questionAnswerMod, questionOptionAdd, questionOptionMod,
                questionOptionDelete, questionNecessary, questionAnswerInit,
                questionInit, questionReorder, questionCompleteCheck
            } = questionSlice.actions;

export default questionSlice.reducer;