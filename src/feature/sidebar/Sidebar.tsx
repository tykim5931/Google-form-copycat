import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { questionAdd, questionAnswerInit, questionCompleteCheck, questionInit } from '../question/questionSlice';
import '../../index.css'
import './style.css'


const SideBar = () => {
  const dispatch = useDispatch()
  
  // ============== Render QuestionBox ===============
  const isComplete = useSelector((state:RootState) => state.questions.isComplete)
  
  // =========== Find HREF Location =================
  const location = useLocation()
  const isPreview = location.pathname === '/preview';
  
  // =========== EventHandler ========================
  const onNewQuestionClicked = () => {
    const newQuestion = {
      id: nanoid(),
      type: 0,
      isnecessary: false,
      ask: '',
      answer: '',
      options: [{id:1, content:'옵션1'}],
      selected: [],
    }
    dispatch(questionAdd(newQuestion))
  }
  const onInitializeForm = () => {
    dispatch(questionInit(true));
  }
  const oninitializeAns = () => {
    dispatch(questionAnswerInit({}))
  }
  const navigate = useNavigate();
  const onGetResultPage = () => {
    dispatch(questionCompleteCheck())
    if(isComplete) navigate('/result')
    else return;
  };

  if(isPreview){
    return (
      <div>
        {!isComplete && <p className='alertMessage'>필수 항목에 답변하지 않았습니다.</p>}
        <div className="floatingContainer">
          <button onClick={onGetResultPage}>
          <img src={require("../../assets/check_icon.png")} />
          <p className='btnTag'>제출하기</p>
          </button>
          
          <Link to="/">
              <button>
                <img src={require("../../assets/preview_undo_icon.png")} />
                <p className='btnTag'>문항편집</p>
              </button>
          </Link>

          <button onClick={oninitializeAns}>
          <img src={require("../../assets/erase_icon.png")} />
          <p className='btnTag'>답변 삭제</p>
          </button>
        </div>

      </div>
    )
  }
  return (
    <div className="floatingContainer">
      <button onClick={onNewQuestionClicked}>
        <img src={require("../../assets/add_icon.png")} />
        <p className='btnTag'>질문 추가</p>
      </button>
      <Link to="/preview">
          <button>
            <img src={require("../../assets/preview_icon.png")} />
            <p className='btnTag'>미리보기</p>
          </button>
      </Link>
      <button onClick={onInitializeForm}>
          <img src={require("../../assets/clear_icon.png")} />
          <p className='btnTag'>양식 삭제</p>
      </button>
    </div>
  );
};


export default SideBar;
