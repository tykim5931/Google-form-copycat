import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../app/store';

import { titleMod, infoMod } from "./titleSlice";
import '../../index.css';
import './style.css';
import { useLocation } from 'react-router-dom';

const TitleBox = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;
    
    const forminfo = useSelector((state:RootState) => state.title)

    const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(titleMod(e.target.value))
    }
    const onInfoChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(infoMod(e.target.value))
    }

    return (
        <div className="container" id="titleBox">
            <input 
                type="text"
                id="formTitle"
                name="formTitle"
                value={forminfo.title}
                placeholder="제목 없는 설문지"
                onChange={onTitleChanged}
                disabled={isEdit? false : true}
            />
            <br></br>
            <input 
                type="text"
                id="formInfo"
                name="formInfo"
                value={forminfo.info}
                placeholder="설문지 설명"
                onChange={onInfoChanged}
                disabled={isEdit? false : true}
            />
        </div>
    )
}


export default TitleBox;