import PostCard from "./common/post-card";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import getAllPosts from "../../api/get-all-posts";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate, useParams } from "react-router";
import CreateAnnouncementModal from "./modals/create-announcement-modal";
import { toast } from "react-toastify";
import createPost from "../../api/create-post";
import { POST_TYPE_ANNOUNCEMENT, POST_TYPE_ASSIGNMENT, TEACHER_ROLE } from "../../global";
// import EditPostPage from "./post/edit-post-page";
import { POST_ROUTE } from "../../routes";

const ClassroomSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const { currentUser, userProfile } = useAuth();
    const [showCreateAnnouncementModal, setShowCreateAnnouncementModal] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    function removeEntry(postID) {
        let updatesEntries = allPosts.filter((entry) => entry.postID !== postID);
        setAllPosts(updatesEntries);
    }

    function onCreateAnnouncementButtonClicked() {
        createPost(currentUser, params.classroomID, POST_TYPE_ANNOUNCEMENT, "")
            .then((response) => {
                if (response.data.status === "success") {
                    // navigate to edit post
                    console.log(response);
                    // todo validate path
                    if (response.data.message.postID) {
                        navigate(POST_ROUTE + "/" + response.data.message.postID);
                    } else {
                        window.location.reload();
                    }
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    function onCreateAssignmentButtonClicked() {
        createPost(currentUser, params.classroomID, POST_TYPE_ASSIGNMENT, "")
            .then((response) => {
                if (response.data.status === "success") {
                    // navigate to edit post
                    console.log(response);
                    // todo validate path
                    if (response.data.message.postID) {
                        navigate(POST_ROUTE + "/" + response.data.message.postID);
                    } else {
                        window.location.reload();
                    }
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    function fetchPosts() {
        setIsLoading(true);
        getAllPosts(currentUser, params.classroomID)
            .then((response) => {
                console.log(response);
                setIsLoading(false);
                if (response.data.status === "success") {
                    setAllPosts(response.data.message);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Classroom Activity</h4>
                {userProfile.role === TEACHER_ROLE && (
                    <div className="dropdown position-relative">
                        <button
                            className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                            // onClick={()=>setShowCreatePostModal(true)}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="createPost"
                        >
                            <FeatherIcon icon="plus" />
                            <span className="ms-2">Create</span>
                        </button>
                        <ul
                            className="dropdown-menu rounded-3 border-0 shadow-md end-0 p-2 mt-2"
                            aria-labelledby="createPost"
                        >
                            <li onClick={onCreateAnnouncementButtonClicked}>
                                <div className="dropdown-item rounded-3 cursor-pointer py-2 d-flex align-items-center text-start">
                                    Announcement
                                </div>
                            </li>
                            <li onClick={onCreateAssignmentButtonClicked}>
                                <div className="dropdown-item rounded-3 cursor-pointer py-2 d-flex align-items-center text-start">
                                    Assignment
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div>
                {isLoading ? (
                    <div className="text-center w-100 mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : allPosts.length > 0 ? (
                    <div>
                        {allPosts.map((post) => (
                            <PostCard post={post} key={post.postID} removeEntry={removeEntry} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center w-100 mt-3 text-500">No Posts yet</div>
                )}
            </div>

            {showCreateAnnouncementModal && (
                <CreateAnnouncementModal setModalVisibility={setShowCreateAnnouncementModal} />
            )}
        </div>
    );
};

export default ClassroomSection;
