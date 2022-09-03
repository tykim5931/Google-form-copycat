import {createSlice} from "@reduxjs/toolkit"
import { useReducer } from "react";
import { RootState } from "../../app/store";

const initialState = [
    {id: '1', title: 'Learning Redux Toolkit', content: "I've heard good things." },
    {id: '2', title: 'Slices...', content: "The more I say slice, the more I want pizza."}
]

export const postsSlice = createSlice ({
    name: 'posts',
    initialState,
    reducers:{
        postAdded(state, action) {
            state.push(action.payload)
        }
    }
})

export const selectAllPosts = (state:RootState) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;