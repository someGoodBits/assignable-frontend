import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import allotMarks from "../../../api/allot-marks";
import deleteFile from "../../../api/delete-file";
import { useAuth } from "../../../contexts/auth-context";
import downloadFile from "../../../utils/download-file";

const SubmissionCard = ({ data }) => {
    const { currentUser } = useAuth();
    const params = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    console.log(data);

    function onDownload() {
        downloadFile(data.fileName, data.filePath);
    }

    function giveMarks(formData) {
        setIsLoading(true);
        allotMarks(currentUser, params.classroomID, params.postID,data.owner,formData.points||0 )
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("Marks Alloted", {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
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
                    <div
                        className="bg-200 rounded-4 d-flex align-items-center justify-content-center text-500"
                        style={{ width: "3rem", height: "3rem" }}
                    >
                        <FeatherIcon icon="file-text" />
                    </div>
                </div>
                <div className="flex-fill ms-3">
                    <div className="lh-1 fw-bolder text-900">{data?.fileName || "-"}</div>
                </div>
                <div className="d-flex align-items-center" style={{ flex: "0 0 2.5rem" }}>
                    <span className="me-2 d-flex btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                        <FeatherIcon width="18" icon="zap" />
                        <input
                            type="number"
                            className="text-500 points-input ms-2 bg-transparent border-0"
                            style={{ fontSize: "12px", minWidth: "2ch", width: "6ch" }}
                            form="allotMarksForm"
                            {...register("points")}
                        ></input>
                    </span>
                    <button className="btn btn-hollow-info p-2 rounded rounded-4" onClick={onDownload}>
                        <FeatherIcon icon="download" />
                    </button>
                    <button form="allotMarksForm" className="btn btn-hollow-safe p-2 rounded rounded-4 ms-2">
                        <FeatherIcon icon="check" />
                    </button>
                </div>
                <form id="allotMarksForm" onSubmit={handleSubmit(giveMarks)}></form>
            </div>
        </div>
    );
};

export default SubmissionCard;
