import assignmentIcon from "../../../assets/images/assignment.png";
import announcementIcon from "../../../assets/images/announcement.png";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { POST_TYPE_ANNOUNCEMENT, POST_TYPE_ASSIGNMENT } from "../../../global";
import { useNavigate, useParams } from "react-router";
import { POST_ROUTE } from "../../../routes";
import moment from "moment";
import { useAuth } from "../../../contexts/auth-context";
import { toast } from "react-toastify";
import removePost from "../../../api/remove-post";

const PostCard = ({ post = {}, removeEntry }) => {
    const [attachments, setAttachments] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const parmas = useParams();
    const [isLoading, setIsLoading] = useState(false);

    function onRemove(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        removePost(currentUser, parmas.classroomID, post.postID)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("Join Request Rejected", {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
                    removeEntry(post.postID);
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

    function onPostClick() {
        console.log("OPEN POST");
        navigate(POST_ROUTE + "/" + (post?.postID || ""));
    }

    return (
        <div key={post.id} className="card flex-row p-3 rounded rounded-4 border-0 shadow-md mb-2">
            <div className="flex-fill">
                <div className="d-flex align-items-center" style={{ height: "3rem" }}>
                    <img
                        width="48"
                        height="48"
                        onClick={onPostClick}
                        src={post.postType === POST_TYPE_ANNOUNCEMENT ? announcementIcon : assignmentIcon}
                        alt=""
                    />
                    <div className="flex-fill ms-3" onClick={onPostClick}>
                        <h5 className="text-900" style={{ textTransform: "capitalize" }}>
                            {post?.postType?.toLowerCase() || ""}
                        </h5>
                        <div className="fw-normal text-500 lh-1" style={{ fontSize: "12px" }}>
                            {moment(post?.createdAt || "").format("Do MMM YYYY")}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        {post.postType === POST_TYPE_ASSIGNMENT && (
                            <span className="me-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                                <FeatherIcon width="18" icon="zap" />
                                <span className="ms-2" style={{ fontSize: "12px" }}>
                                    10 Points
                                </span>
                            </span>
                        )}
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
                                <ul
                                    className="dropdown-menu rounded-3 border-0 shadow-md p-2 mt-2"
                                    style={{ zIndex: "1" }}
                                >
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

                <div className="mt-2 text-500 d-flex" onClick={onPostClick}>
                    <div className="d-none d-lg-block" style={{ flex: "0 0 48px" }}></div>
                    <div className="md-0 ms-lg-3">{post?.description}</div>
                </div>
                <div className="mt-2 d-flex align-items-center">
                    <div className="d-none d-lg-block" style={{ flex: "0 0 48px" }}></div>
                    <div className="flex-fill d-flex ms-0 ms-lg-3">
                        {attachments.slice(0, 1).map((attachment) => (
                            <div
                                key={attachment}
                                className="btn-hollow d-block bg-200 px-2 py-1 rounded rounded-3 cursor-pointer text-nowrap"
                                style={{ textOverflow: "ellipsis", maxWidth: "16ch", overflow: "hidden" }}
                            >
                                <FeatherIcon width="18" icon="paperclip" />
                                <span className="w-100 ms-2 text-nowrap">{attachment}</span>
                            </div>
                        ))}
                        {attachments.length > 1 && (
                            <span className="ms-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                                <span>{attachments.length - 1} more</span>
                            </span>
                        )}
                    </div>
                    <div>
                        {post.type === "ASSIGNMENT" && (
                            <span className="ms-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                                <FeatherIcon width="18" icon="clock" />
                                <span className="ms-2" style={{ fontSize: "12px" }}>
                                    12 May 11:00 PM
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
