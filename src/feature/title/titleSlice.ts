import {createSlice} from "@reduxjs/toolkit"
import { FormInfo } from "../interfaces"

const initialState: FormInfo = {
    title: '제목 없는 설문지',
    info: '',
};

export const titleSlice = createSlice ({
    name: 'title',
    initialState,
    reducers:{
        titleMod(state, action) {
            const title : string = action.payload;
            state.title = title;
        },
        infoMod(state, action) {
            const info : string = action.payload;
            state.info = info;
        }
    }
})

export const { titleMod, infoMod } = titleSlice.actions;

export default titleSlice.reducer;