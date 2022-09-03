import TitleBox from "../feature/title/TitleBox";
import SideBar from "../feature/sidebar/Sidebar";
import AddPostForm from "../feature/posts/AddPostForm";
import '../feature/sidebar/style.css'

const EditPage = () => {
    return (
      <div className="canvas">
        <TitleBox></TitleBox>
        <SideBar></SideBar>
      </div>
    );
  };
  export default EditPage;