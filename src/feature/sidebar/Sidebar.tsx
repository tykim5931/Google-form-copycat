import {BrowserRouter as Router, Link} from 'react-router-dom';
import './style.css'

const SideBar = () => {
    return (
      <div className="floatingContainer">
        <button><img src={require("../../assets/add_icon.png")} /></button>
        <Link to="/preview">
            <button><img src={require("../../assets/preview_icon.png")} /></button>
        </Link>
      </div>
    );
  };
  export default SideBar;
