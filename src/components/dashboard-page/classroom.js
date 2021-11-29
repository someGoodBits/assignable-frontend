import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { CLASSROOM_SETTINGS_ROUTE, CLASSROOM_STUDENTS_ROUTE } from "../../routes";
import SidebarItem from "./common/sidebar-item";

const Classroom = () => {
    let params = useParams();
    let location = useLocation();

    const [activeTab, setActiveTab] = useState("");

    useEffect(()=>{
        let route = location.pathname.split("/")[3];
        if(route === "students") setActiveTab("students");
        else if(route === "settings") setActiveTab("settings")
        else setActiveTab("classroom")
    },[location,setActiveTab])

    return ( 
        <div className="row g-3">
            <div className="col-lg-3 col-4 d-none d-md-block">
                <div className="my-4 d-flex align-items-center" style={{height:"2.5rem"}}>
                    <h3 className="text-primary">{params.classroomID}</h3>
                </div>
                <div>
                    <SidebarItem link={""} icon={<FeatherIcon icon="file-text" />} title="Classroom" isActive={activeTab === "classroom"}/>
                    <SidebarItem link={CLASSROOM_STUDENTS_ROUTE} icon={<FeatherIcon icon="users"/>} title="Student" isActive={activeTab === "students"}/>
                    <SidebarItem link={CLASSROOM_SETTINGS_ROUTE} icon={<FeatherIcon icon="settings"/>} title="Settings" isActive={activeTab === "settings"}/>
                </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12">
                <Outlet/>
            </div> 
            <div className="col-3"></div>
        </div> 
    );
}
 
export default Classroom;