import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import '../index.css'
import QuestionList from "../feature/question/QuestionList";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { questionAnswerInit } from "../feature/question/questionSlice";
import { useCallback } from "react";

const Preview = () => {
    const dispatch = useDispatch()
    const questions = useSelector((state:RootState) => state.questions)

    const initializeAns = () => {
      dispatch(questionAnswerInit({}))
    }
    
    const navigate = useNavigate();
    const handleComplete = useCallback(() => {
      questions.forEach((question, idx) => {
        if (question.isnecessary) {
          if ((question.type > 1 && question.selected.length === 0) || 
              (question.type <= 1 && question.answer==="")){
                console.log("necessary is not filled")
                return;
          }
        }
      })
      navigate('/result', {replace: true})
    }, [navigate]);

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

const ConditionalLink = ({condition}:{condition:boolean}) => (condition)
  ? <Link to="/result">제출</Link>
  : <>제출</>

export default Preview;