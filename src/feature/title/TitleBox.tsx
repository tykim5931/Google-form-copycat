import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

import { titleAdded } from "./titleSlice";
import './style.css'
import { useLocation } from 'react-router-dom';

const TitleBox = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;
    
    const forminfo = useSelector((state:RootState) => state.title)
    const [form, setForm] = useState({
        title: forminfo.title,
        info: forminfo.info,
    })
    const setFormInfo = (name: string, value: string) => {
        setForm({
            ...form,
            [name]:value,
        });
    }

    const onTitleChanged = (e:any) => setFormInfo('title', e.target.value)
    const onInfoChanged = (e:any) => setFormInfo('info', e.target.value)
    const onClickSave = () => {
        dispatch(
            titleAdded({
                id: nanoid(),
                title: form.title,
                info: form.info
            })
        )
    }

    return (
        <div className="container" onClick={onClickSave} id="titleBox">
            <input 
                type="text"
                id="formTitle"
                name="formTitle"
                value={form.title}
                placeholder="제목 없는 설문지"
                onChange={onTitleChanged}
                disabled={isEdit? false : true}
            />
            <br></br>
            <input 
                type="text"
                id="formInfo"
                name="formInfo"
                value={form.info}
                placeholder="설문지 설명"
                onChange={onInfoChanged}
                disabled={isEdit? false : true}
            />
        </div>
    )
}


export default TitleBox;