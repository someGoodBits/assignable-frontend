import SidebarItem from "../common/sidebar-item";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import EditPostCard from "../common/edit-post-card";
import { useParams } from "react-router";
import getPostByID from "../../../api/get-post-by-ID";
import { useAuth } from "../../../contexts/auth-context";
import { toast } from "react-toastify";
import editPost from "../../../api/edit-post";
import { POST_TYPE_ASSIGNMENT, STUDENT_ROLE, TEACHER_ROLE } from "../../../global";
import uploadFile from "../../../api/upload-file";
import getUploads from "../../../api/get-uploads";
import UploadedFileCard from "../common/uploaded-file-card";
import getSubmissions from "../../../api/get-submissions";

const EditPostPage = () => {
    const params = useParams();
    const { currentUser, userProfile } = useAuth();
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingUploads, setIsFetchingUploads] = useState(true);
    const [isFetchingSubmissions, setIsFetchingSubmissions] = useState(true);
    const [postData, setPostData] = useState({});
    const [uploads, setUploads] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchPost();
        fetchUploads();
        if(userProfile.role === STUDENT_ROLE) {
            fetchSubmissions();
        }
    }, []);

    function fetchPost() {
        setIsFetching(true);
        getPostByID(currentUser, params.classroomID, params.postID)
            .then((response) => {
                setIsFetching(false);
                if (response.data.status) {
                    setPostData(response.data.message);
                    console.log({ post: response.data.message })
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

    function fetchUploads() {
        setIsFetchingUploads(true);
        getUploads(currentUser, params.classroomID, params.postID)
            .then((response) => {
                setIsFetchingUploads(false);
                if (response.data.status) {
                    setUploads(response.data.message);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsFetchingUploads(false);
                console.log(error.response);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    function fetchSubmissions() {
        setIsFetchingSubmissions(true);
        getSubmissions(currentUser, params.classroomID, params.postID)
            .then((response) => {
                setIsFetchingSubmissions(false);
                if (response.data.status) {
                    setSubmissions(response.data.message);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsFetchingSubmissions(false);
                console.log(error.response);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    function onFileUpload(e) {
        if (e.target.files.length > 0) {
            setIsLoading(true);
            uploadFile(currentUser, params.classroomID, params.postID, e.target.files[0])
                .then((response) => {
                    setIsLoading(false);
                    console.log(response);
                    if (response.data.status) {
                        toast.success("File Uploaded Successfully", {
                            position: "bottom-center",
                            autoClose: 5000,
                        });
                        fetchUploads();
                        // setTimeout(()=>{
                        //     window.location.reload();
                        // },2000)
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
    }

    function onFileSubmit(e) {
        if (e.target.files.length > 0) {
            setIsLoading(true);
            uploadFile(currentUser, params.classroomID, params.postID, e.target.files[0])
                .then((response) => {
                    setIsLoading(false);
                    console.log(response);
                    if (response.data.status) {
                        toast.success("File Uploaded Successfully", {
                            position: "bottom-center",
                            autoClose: 5000,
                        });
                        fetchSubmissions();
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
    }

    function onSave(data) {
        if (data.postType === POST_TYPE_ASSIGNMENT) {
            data.deadline = isNaN(new Date(data.deadlineDate).getTime())
                ? 0
                : new Date(data.deadlineDate).getTime().toString();
        }

        editPost(currentUser, params.classroomID, params.postID, data)
            .then((response) => {
                setIsFetching(false);
                console.log(response);
                if (response.data.status) {
                    toast.success("Post Updated Successfully", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
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

    function removeEntry() {
        setTimeout(()=>{
            window.location.reload();
        },2000)
    }

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Post</h4>
                {userProfile.role === TEACHER_ROLE && (
                    <button
                        className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                        type="submit"
                        form="editPostForm"
                        // onClick={()=>setShowCreatePostModal(true)}
                    >
                        <FeatherIcon icon="save" />
                        <span className="ms-2">Save</span>
                    </button>
                )}
            </div>
            <div>
                {isFetching ? (
                    <div className="text-center w-100 mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : (
                    <EditPostCard post={postData} onSave={onSave} role={userProfile.role} />
                )}
            </div>
            <div>
                <div className="py-4 d-flex align-items-center justify-content-between">
                    <h4 className="text-900">Attachements</h4>
                    {userProfile.role === TEACHER_ROLE && (
                        <label className="btn btn-primary btn-48 rounded rounded-4 ps-2">
                            <input type="file" hidden onChange={onFileUpload} />
                            <FeatherIcon icon="upload" />
                            <span className="ms-2">Upload</span>
                        </label>
                    )}
                </div>
                <div>
                    {isFetchingUploads ? (
                        <div className="text-center w-100 mt-5">
                            <div className="spinner-border text-primary"></div>
                        </div>
                    ) : uploads?.length > 0 ? (
                        uploads.map((fileData) => (
                            <div className="mb-2" key={fileData.id}>
                                <UploadedFileCard showDelete={userProfile.role !== STUDENT_ROLE} data={fileData} removeEntry={removeEntry} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100 mt-2">No Uploaded Files</div>
                    )}
                </div>
            </div>

            {userProfile.role === STUDENT_ROLE && (
                <div>
                    <div className="py-4 d-flex align-items-center justify-content-between">
                        <h4 className="text-900">Submissions</h4>
                        {
                            postData.submissionOpen !== "false" && (
                                <label className="btn btn-primary btn-48 rounded rounded-4 ps-2">
                                    <input type="file" hidden onChange={onFileSubmit} />
                                    <FeatherIcon icon="upload" />
                                    <span className="ms-2">Upload</span>
                                </label>
                            )
                        }
                    </div>
                    <div>
                        {isFetchingSubmissions ? (
                            <div className="text-center w-100 mt-5">
                                <div className="spinner-border text-primary"></div>
                            </div>
                        ) : submissions?.length > 0 ? (
                            submissions.map((fileData) => (
                                <div className="mb-2" key={fileData.id}>
                                    <UploadedFileCard data={fileData} removeEntry={removeEntry} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-100 mt-2">No Uploaded Files</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPostPage;
