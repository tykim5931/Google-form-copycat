import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

import { titleAdded } from "./titleSlice";
import './style.css'

const AddPostForm = () => {
    const dispatch = useDispatch()

    const forminfo = useSelector((state:RootState) => state.title)
    console.log(forminfo)
    const [form, setForm] = useState({
        title: forminfo.title,
        info: forminfo.info,
    })
    const setFormInfo = (name: string, value: string) => {
        setForm({
            ...form,
            [name]:value,
        });
        dispatch(
            titleAdded({
                id: nanoid(),
                title: form.title,
                info: form.info
            })
        )
    }

    const onTitleChanged = (e:any) => setFormInfo('title', e.target.value)
    const onInfoChanged = (e:any) => setFormInfo('info', e.target.value)

    return (
        <div className="container">
            <input 
                type="text"
                id="formTitle"
                name="formTitle"
                value={form.title}
                placeholder="제목 없는 설문지"
                onChange={onTitleChanged}
            />
            <br></br>
            <input 
                type="text"
                id="formInfo"
                name="formInfo"
                value={form.info}
                placeholder="설문지 설명"
                onChange={onInfoChanged}
            />
        </div>
    )
}


export default AddPostForm;