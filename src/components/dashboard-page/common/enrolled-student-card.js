import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import removeStudent from "../../../api/remove-student";
import { useAuth } from "../../../contexts/auth-context";

const EnrolledStudentsCard = ({ data, removeEntry }) => {
    const { currentUser } = useAuth();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    function onRemove() {
        setIsLoading(true);
        removeStudent(currentUser, params.classroomID, data.studentID)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("Student has been removed successfully", {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
                    removeEntry(data.id);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    return (
        <div className="card border-0 rounded-5 shadow-sm p-3">
            <div className="d-flex align-items-center">
                <div style={{ flex: "0 0 3rem" }}>
                    <div className="bg-200 rounded-circle" style={{ width: "3rem", height: "3rem" }}></div>
                </div>
                <div className="flex-fill ms-3">
                    <div className="lh-1 fs-5 fw-bolder text-900">{data?.studentName || ""}</div>
                    <div className="fs-6 text-500">{data?.enrollmentNumber || ""}</div>
                </div>
                <div className="d-flex align-items-center" style={{ flex: "0 0 2.5rem" }}>
                    {isLoading ? (
                        <div className="pe-2">
                            <div className="spinner-border spinner-border-sm text-500"></div>
                        </div>
                    ) : (
                        <div className="dropdown position-relative">
                            <button
                                className="btn btn-hollow p-2 rounded rounded-4"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                // id="createPost"
                            >
                                <FeatherIcon icon="more-vertical" />
                            </button>
                            <ul className="dropdown-menu rounded-3 border-0 shadow-md p-2 mt-2" style={{ zIndex: "1" }}>
                                <li onClick={onRemove}>
                                    <div className="dropdown-item rounded-3 cursor-pointer py-2 d-flex align-items-center text-start">
                                        Remove
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrolledStudentsCard;
