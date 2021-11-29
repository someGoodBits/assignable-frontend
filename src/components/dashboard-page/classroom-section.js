import PostCard from "./common/post-card";
import FeatherIcon from "feather-icons-react";

const ClassroomSection = () => {
    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Classrooms</h4>
                <button className="btn btn-primary btn-48 rounded rounded-4 ps-2">
                    <FeatherIcon icon="plus" />
                    <span className="ms-2">Create</span>
                </button>
            </div>

            <div>
                <PostCard type="ANNOUNCEMENT" />
                <PostCard type="ASSIGNMENT" />
            </div>
        </div>
    );
};

export default ClassroomSection;
