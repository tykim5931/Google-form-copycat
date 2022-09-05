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
        <QuestionList></QuestionList>
        <SideBar></SideBar>
      </div>
  );
};

export default EditPage;