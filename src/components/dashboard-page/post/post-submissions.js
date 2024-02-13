import SidebarItem from "../common/sidebar-item";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import getSubmissions from "../../../api/get-submissions";
import { useAuth } from "../../../contexts/auth-context";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import UploadedFileCard from "../common/uploaded-file-card";
import SubmissionCard from "../common/submission-card";

const PostSubmissionSection = () => {
    const { currentUser } = useAuth();
    const params = useParams();
    const [allSubmissions, setAllSubmissions] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    function fetchSubmissions() {
        setIsFetching(true);
        getSubmissions(currentUser, params.classroomID, params.postID)
            .then((response) => {
                setIsFetching(false);
                console.log(response);
                if (response.data.status) {
                    setAllSubmissions(response.data.message);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsFetching(false);
                console.log(error.response);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Submissions</h4>
            </div>
            <div>
                {
                    allSubmissions.map((fileData) => (
                        <div className="mb-2" key={fileData.id}>
                            <SubmissionCard data={fileData} showDelete={false} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PostSubmissionSection;
