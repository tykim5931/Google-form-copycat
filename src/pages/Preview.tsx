import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import '../index.css'
import QuestionList from "../feature/question/QuestionList";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { questionAnswerInit, questionCompleteCheck} from "../feature/question/questionSlice";
import { useCallback } from "react";

const Preview = () => {
    const dispatch = useDispatch()
    const isComplete = useSelector((state:RootState) => state.questions.isComplete)

    const initializeAns = () => {
      dispatch(questionAnswerInit({}))
    }
    
    const navigate = useNavigate();
    const handleComplete = () => {
      dispatch(questionCompleteCheck())
      console.log(isComplete)
      if(isComplete) navigate('/result')
      else {
        console.log("필수항목 채우세요")
      }
    };

    return (
      <div className="formCanvas">
        <TitleBox></TitleBox>
        <SideBar></SideBar>
        <QuestionList></QuestionList>
        <div>
          <button onClick={handleComplete}>제출</button>
          <button onClick={initializeAns}>양식 지우기</button>
        </div>
      </div>
    );
  };

  
export default Preview;