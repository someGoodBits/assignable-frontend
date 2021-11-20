import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import ClassroomCard from "./common/classroom-card";

const DashboardClassroom = () => {
    const [classroomList, setClassroomList] = useState([{
        classroomName : "DBMS",
        classroomDescription : "Database Management System"
    }]);

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Your Classrooms</h4>
                {classroomList.length > 0 && (
                    <button className="btn btn-primary btn-48 rounded rounded-4 ps-2">
                        <FeatherIcon icon="plus" />
                        <span className="ms-2">Create</span>
                    </button>
                )}
            </div>
            <div className="mb-3">
                {classroomList.length === 0 ? (
                    <div className="d-flex align-items-center justify-content-center flex-column mt-5">
                        <h5 className="text-500 text-center fw-normal fs-5" style={{maxWidth:"32ch"}}>Looks like you don't have any Classroom. Lets create one!</h5>
                        <div className="mt-4">
                            <button className="btn btn-primary btn-48 rounded rounded-4 ps-2">
                                <FeatherIcon icon="plus" />
                                <span className="ms-2">Create</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {classroomList.map((classroom) => (
                            <div key={classroom.classroomName} className="col">
                                <ClassroomCard classroomDetails={classroom} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardClassroom;
