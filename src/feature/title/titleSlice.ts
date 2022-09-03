import {createSlice} from "@reduxjs/toolkit"

interface FormInfo {
    title: string;
    info: string;
}

const initialState: FormInfo = {
    title: '제목 없는 설문지',
    info: '',
};

export const titleSlice = createSlice ({
    name: 'title',
    initialState,
    reducers:{
        titleAdded(state, action) {
            const {title, info} = action.payload;
            state.title = title;
            state.info = info;
        }
    }
})

export const { titleAdded } = titleSlice.actions;

export default titleSlice.reducer;