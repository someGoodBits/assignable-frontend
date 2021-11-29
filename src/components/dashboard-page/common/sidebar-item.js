import { Link } from "react-router-dom";
import "./sidebar-item.scss" ;

const SidebarItem = ({ icon,title = "Item", isActive = false ,link}) => {
    return isActive ? (
        <div className="bg-300 d-flex align-items-center p-3 mb-1 rounded rounded-4 cursor-pointer sidebar-item active" style={{ height: "3rem" }}>
            {icon}
            <div className="sidebar-item-title fw-bolder text-primary ms-2 lh-1">{title}</div>
        </div>
    ) : (
        <Link to={link} style={{textDecoration:"none"}}>
            <div className="d-flex align-items-center p-3 mb-1 rounded rounded-4 cursor-pointer sidebar-item" style={{ height: "3rem" }}>
                {icon}
                <div className="sidebar-item-title fw-bolder text-500 ms-2 lh-1">{title}</div>
            </div>
        </Link>
    );
};

export default SidebarItem;
