import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import acceptJoinRequest from "../../../api/accept-join-request";
import rejectJoinRequest from "../../../api/reject-join-request";
import { useAuth } from "../../../contexts/auth-context";
const JoinRequestCard = ({ data , removeEntry }) => {
    const { currentUser } = useAuth();
    const parmas = useParams();
    const [isLoading, setIsLoading] = useState(false);

    function acceptRequest() {
        setIsLoading(true);
        acceptJoinRequest(currentUser, parmas.classroomID, data.id)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("Join Request Accepted", {
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

    function rejectReuest() {
        setIsLoading(true);
        rejectJoinRequest(currentUser, parmas.classroomID, data.id)
        
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("Join Request Rejected", {
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
                    <div className="lh-1 fs-5 fw-bolder text-900">{data?.studentName}</div>
                    <div className="fs-6 text-500">{data?.enrollmentNumber || ""}</div>
                </div>
                {isLoading ? (
                    <div className="pe-2" >
                        <div className="spinner-border spinner-border-sm text-500"></div>
                    </div>
                ) : (
                    <div className="d-flex align-items-center" style={{ flex: "0 0 2.5rem" }}>
                        <div className="btn btn-hollow-safe p-2 rounded-circle" onClick={acceptRequest}>
                            <FeatherIcon icon="check" />
                        </div>
                        <div className="btn btn-hollow-danger p-2 rounded-circle ms-2" onClick={rejectReuest}>
                            <FeatherIcon icon="x" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JoinRequestCard;
