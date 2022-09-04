import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import '../index.css'
import QuestionList from "../feature/question/QuestionList";

const Preview = () => {
    return (
      <div className="formCanvas">
        <TitleBox></TitleBox>
        <QuestionList></QuestionList>
      </div>
    );
  };
  export default Preview;