import SidebarItem from "../common/sidebar-item";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { SUBMISSION_ROUTE } from "../../../routes";
import { useAuth } from "../../../contexts/auth-context";
import { TEACHER_ROLE } from "../../../global";

const PostPage = () => {
    const [activeTab, setActiveTab] = useState("post");
    const location = useLocation();

    const { userProfile } = useAuth();

    useEffect(() => {
        let route = location.pathname.split("/")[5];
        if (route === "submission") setActiveTab("submission");
        else setActiveTab("post");
    }, [location, setActiveTab]);

    return (
        <div className="row g-3">
            <div className="col-lg-3 col-4 d-none d-md-block">
                <div className="my-4 d-flex align-items-center" style={{ height: "2.5rem" }}>
                    <h3
                        className="text-primary text-nowrap"
                        style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    ></h3>
                </div>
                <div>
                    <SidebarItem
                        link={""}
                        icon={<FeatherIcon icon="file-text" />}
                        title="Post"
                        isActive={activeTab === "post"}
                    />
                    <SidebarItem
                        link={"submission"}
                        icon={<FeatherIcon icon="layers" />}
                        title="Submissions"
                        isActive={activeTab === "submission"}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12">
                <Outlet />
            </div>
            <div className="col-3"></div>
        </div>
    );
};

export default PostPage;
