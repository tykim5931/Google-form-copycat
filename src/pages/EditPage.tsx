import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import '../index.css'
import QuestionList from "../feature/question/QuestionList";
import { useDispatch } from "react-redux";
import { questionInit } from "../feature/question/questionSlice";

const EditPage = () => {
  const dispatch = useDispatch()
  const onInitializeForm = () => {
    console.log("init!!")
    dispatch(questionInit(true));
  }
  return (
      <div className="formCanvas">
        <TitleBox></TitleBox>
        <SideBar></SideBar>
        <QuestionList></QuestionList>
        <button onClick={onInitializeForm}>양식 지우기</button>
      </div>
  );
};

export default EditPage;