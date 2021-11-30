import SidebarItem from "../common/sidebar-item";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const CreateAnnouncementPage = () => {
    const [activeTab, setActiveTab] = useState("");
    return (
        <div className="row g-3">
            <div className="col-lg-3 col-4 d-none d-md-block">
                <div className="my-4 d-flex align-items-center" style={{ height: "2.5rem" }}>
                    <h3 className="text-primary text-nowrap" style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                        
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
                        link={""}
                        icon={<FeatherIcon icon="users" />}
                        title="Student"
                        isActive={activeTab === "students"}
                    />
                </div>
            </div>
            <div className="col-lg-6 col-md-8 col-12">
                
            </div>
            <div className="col-3"></div>
        </div>
    );
};

export default CreateAnnouncementPage;
