import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import getClassroomByID from "../../api/get-classroom-by-id";
import { useAuth } from "../../contexts/auth-context";
import { TEACHER_ROLE } from "../../global";
import {
    CLASSROOM_DASHBOARD_ROUTE,
    CLASSROOM_SETTINGS_ROUTE,
    CLASSROOM_STUDENTS_REQUEST_LIST_ROUTE,
    CLASSROOM_STUDENTS_ROUTE,
} from "../../routes";
import SidebarItem from "./common/sidebar-item";

const Classroom = () => {
    let params = useParams();
    let location = useLocation();

    const [activeTab, setActiveTab] = useState("");
    const { currentUser , userProfile } = useAuth();
    const [classroomData, setClassroomData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let route = location.pathname.split("/")[3];
        if (route === "students") setActiveTab("students");
        else if (route === "settings") setActiveTab("settings");
        else if (route === "requests") setActiveTab("requests");
        else setActiveTab("classroom");
    }, [location, setActiveTab]);

    useEffect(() => {
        getClassroomByID(currentUser, params.classroomID)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status === "success") {
                    setClassroomData(response.data.message);
                } else {
                    setClassroomData(null);
                    toast.error(response.data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                    navigate("/" + CLASSROOM_DASHBOARD_ROUTE);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
                navigate("/" + CLASSROOM_DASHBOARD_ROUTE);
            });
    }, []);

    return (
        <div className="row g-3">
            <div className="col-lg-3 col-4 d-none d-md-block">
                <div className="my-4 d-flex align-items-center" style={{ height: "2.5rem" }}>
                    <h3 className="text-primary text-nowrap" style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                        {classroomData?.classroomName || ""}
                    </h3>
                </div>
                <div>
                    <SidebarItem
                        link={""}
                        icon={<FeatherIcon icon="file-text" />}
                        title="Classroom"
                        isActive={activeTab === "classroom"}
                    />
                    <SidebarItem
                        link={CLASSROOM_STUDENTS_ROUTE}
                        icon={<FeatherIcon icon="users" />}
                        title="Enrolled Students"
                        isActive={activeTab === "students"}
                    />
                    {userProfile.role === TEACHER_ROLE && (
                        <SidebarItem
                            link={CLASSROOM_STUDENTS_REQUEST_LIST_ROUTE}
                            icon={<FeatherIcon icon="user-plus" />}
                            title="Join Requests"
                            isActive={activeTab === "requests"}
                        />
                    )}
                    {userProfile.role === TEACHER_ROLE && (
                        <SidebarItem
                            link={CLASSROOM_SETTINGS_ROUTE}
                            icon={<FeatherIcon icon="settings" />}
                            title="Settings"
                            isActive={activeTab === "settings"}
                        />
                    )}
                </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12">
                {isLoading ? (
                    <div className="text-center w-100 mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
            <div className="col-3"></div>
        </div>
    );
};

export default Classroom;
