import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import '../index.css'
import QuestionList from "../feature/question/QuestionList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { questionAnswerInit } from "../feature/question/questionSlice";

const Preview = () => {
    const dispatch = useDispatch()
    const questions = useSelector((state:RootState) => state.questions)

    const initializeAns = () => {
      dispatch(questionAnswerInit({}))
    }
    return (
      <div className="formCanvas">
        <TitleBox></TitleBox>
        <SideBar></SideBar>
        <QuestionList></QuestionList>
        <div>
          <Link to="/result">
            <button>제출</button>
          </Link>
          <button
            onClick={initializeAns}
          >양식 지우기</button>
        </div>
      </div>
    );
  };
  export default Preview;