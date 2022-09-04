import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import '../index.css'
import QuestionList from "../feature/question/QuestionList";

const EditPage = () => {
    return (
      <div className="formCanvas">
        <TitleBox></TitleBox>
        <SideBar></SideBar>
        <QuestionList></QuestionList>
      </div>
    );
  };
  export default EditPage;