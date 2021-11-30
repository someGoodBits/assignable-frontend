import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import getClassroom from "../../api/get-classroom";
import { useAuth } from "../../contexts/auth-context";
import { TEACHER_ROLE } from "../../global";
import getErrorMessage from "../../utils/error-factory";
import ClassroomCard from "./common/classroom-card";
import CreateClassroomModal from "./modals/create-classroom-modal";
import JoinClassroomModal from "./modals/join-classroom-modal";

const ClassroomList = () => {
    const [classroomList,setClassroomList] = useState([]);
    const {currentUser, userProfile } = useAuth();
    const [showCreateClassroomModal, setShowCreateClassroomModal] = useState(false);
    const [showJoinClassroomModal, setShowJoinClassroomModal] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        getClassroom(currentUser).then((response)=>{
            console.log(response);
            setIsFetchingData(false);
            if(response.data.status === "success") {
                setClassroomList(response.data.message);
            }
        }).catch((error) => {
            setIsFetchingData(false);
            console.error(error);
            toast.error(getErrorMessage(error.code), {
                position: "bottom-center",
                autoClose: 5000,
            });
        })
    },[])

    function onClassroomCreateButtonClicked() {
        setShowCreateClassroomModal(true);
    }

    function onClassroomJoinButtonClicked() {
        setShowJoinClassroomModal(true);
    }

    function openClassroom(classroom){
        navigate(classroom.id)
    }

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Your Classrooms</h4>
                {(classroomList.length > 0 && !isFetchingData) &&
                    (userProfile && userProfile.role === TEACHER_ROLE ? (
                        <button
                            className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                            onClick={onClassroomCreateButtonClicked}
                        >
                            <FeatherIcon icon="plus" />
                            <span className="ms-2">Create</span>
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                            onClick={onClassroomJoinButtonClicked}
                        >
                            <FeatherIcon icon="plus" />
                            <span className="ms-2">Join</span>
                        </button>
                    ))}
            </div>
            <div className="mb-3">
                {(classroomList.length === 0 && !isFetchingData) ? (
                    <div className="d-flex align-items-center justify-content-center flex-column mt-5">
                        <h5 className="text-500 text-center fw-normal fs-5" style={{ maxWidth: "32ch" }}>
                            Looks like you don't have any Classroom. Lets create one!
                        </h5>
                        <div className="mt-4">
                            {userProfile && userProfile.role === TEACHER_ROLE ? (
                                <button
                                    className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                                    onClick={onClassroomCreateButtonClicked}
                                >
                                    <FeatherIcon icon="plus" />
                                    <span className="ms-2">Create</span>
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                                    onClick={onClassroomJoinButtonClicked}
                                >
                                    <FeatherIcon icon="plus" />
                                    <span className="ms-2">Join</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                        {
                            isFetchingData ? (
                                <div className="text-center w-100 mt-5">
                                    <div className="spinner-border text-primary"></div>
                                </div>
                            ) : (
                                classroomList.map((classroom, i) => (
                                    // todo replace with classroom id
                                    <div key={classroom.classroomName} className="col" onClick={() => openClassroom(classroom)}>
                                        <ClassroomCard classroomDetails={classroom} />
                                    </div>
                                ))
                            )
                        }
                    </div>
                )}
            </div>
                            
            {showCreateClassroomModal && <CreateClassroomModal setModalVisibility={setShowCreateClassroomModal} />}
            {showJoinClassroomModal && <JoinClassroomModal setModalVisibility={setShowJoinClassroomModal} />}

        </div>
    );
};

export default ClassroomList;
