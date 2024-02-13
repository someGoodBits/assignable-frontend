import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import deleteFile from "../../../api/delete-file";
import { useAuth } from "../../../contexts/auth-context";
import downloadFile from "../../../utils/download-file";

const UploadedFileCard = ({ data, removeEntry , showDelete=true}) => {
    const { currentUser } = useAuth();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    function onDownload(){
        downloadFile(data.fileName,data.filePath);
    }

    function onRemove() {
        setIsLoading(true);
        deleteFile(currentUser, params.classroomID, params.postID, data.id, data.filePath)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("File Removed Successfully", {
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
                    <button className="btn btn-hollow-info p-2 rounded rounded-4" onClick={onDownload}>
                        <FeatherIcon icon="download" />
                    </button>
                    {showDelete && (isLoading ? (
                        <div className="pe-2">
                            <div className="spinner-border spinner-border-sm text-500"></div>
                        </div>
                    ) : (
                        <button className="btn btn-hollow-danger p-2 rounded rounded-4 ms-2" onClick={onRemove}>
                            <FeatherIcon icon="trash" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UploadedFileCard;
