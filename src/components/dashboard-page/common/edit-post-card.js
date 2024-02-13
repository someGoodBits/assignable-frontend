import assignmentIcon from "../../../assets/images/assignment.png";
import announcementIcon from "../../../assets/images/announcement.png";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { POST_TYPE_ANNOUNCEMENT, POST_TYPE_ASSIGNMENT, STUDENT_ROLE, TEACHER_ROLE } from "../../../global";
import { useParams } from "react-router";
import moment from "moment";
import { useAuth } from "../../../contexts/auth-context";
import { toast } from "react-toastify";
import removePost from "../../../api/remove-post";
import { useForm } from "react-hook-form";
import getMarks from "../../../api/get-marks";

const EditPostCard = ({ post = {}, onSave, role }) => {
    const { currentUser } = useAuth();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        setValue("description", post.description);
        setValue("isPublic", post?.isPublic || false);
        setValue("postType", post?.postType);
        if (post?.postType === POST_TYPE_ASSIGNMENT) {
            setValue("maxPoints", post?.maxPoints);
            setValue("submissionOpen", post?.submissionOpen);
            // todo set deadline date
            // fetchMarks();
        }
        // console.log(post);
    }, [post]);

    function onRemove(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        removePost(currentUser, params.classroomID, post.postID)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status) {
                    toast.success("Post Deleted Successfully", {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
                    // todo navigate to classroom section
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

    function fetchMarks(){
        getMarks(currentUser,params.classroomID,params.postID,currentUser.uid).then((response) => {
            console.log(response)
            if (response.data.status === "success") {
                setValue("maxPoints",response.data.message);
            } else {
                toast.error(response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            }
        })
        .catch((error) => {
            console.log(error.response)

            toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                position: "bottom-center",
                autoClose: 5000,
            });
        });
    }

    return (
        <div key={post.id} className="card flex-row p-3 rounded rounded-4 border-0 shadow-md mb-2">
            <div className="flex-fill">
                <div className="d-flex align-items-center" style={{ height: "3rem" }}>
                    <img
                        width="48"
                        height="48"
                        src={post.postType === POST_TYPE_ANNOUNCEMENT ? announcementIcon : assignmentIcon}
                        alt=""
                    />
                    <div className="flex-fill ms-3">
                        <h5 className="text-900" style={{ textTransform: "capitalize" }}>
                            {post?.postType?.toLowerCase() || ""}
                        </h5>
                        <div className="fw-normal text-500 lh-1" style={{ fontSize: "12px" }}>
                            {moment(post?.createdAt || "").format("Do MMM YYYY")}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        {role === TEACHER_ROLE && (
                            <div className="form-check form-switch">
                                <input
                                    form="editPostForm"
                                    className="form-check-input cursor-pointer"
                                    type="checkbox"
                                    id="publicSwitch"
                                    {...register("isPublic")}
                                />
                            </div>
                        )}

                        {post.postType === POST_TYPE_ASSIGNMENT && (
                            <span className="me-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                                <FeatherIcon width="18" icon="zap" />
                                <input
                                    type="number"
                                    className="text-500 points-input ms-2 bg-transparent border-0"
                                    style={{ fontSize: "12px", minWidth: "2ch", width: "6ch" }}
                                    {...register("maxPoints")}
                                ></input>
                            </span>
                        )}

                        {isLoading ? (
                            <div className="pe-2">
                                <div className="spinner-border spinner-border-sm text-500"></div>
                            </div>
                        ) : (
                            role === TEACHER_ROLE && (
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
                            )
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    {role === TEACHER_ROLE ? (
                        <textarea
                            placeholder="Enter Description"
                            className="form-control rounded-4"
                            style={{ minHeight: "8rem" }}
                            form="editPostForm"
                            {...register("description")}
                        ></textarea>
                    ) : (
                        <div className="text-500">{post?.description || "-"}</div>
                    )}
                </div>

                {post.postType === POST_TYPE_ASSIGNMENT && role === TEACHER_ROLE  &&  (
                    <div className="d-flex justify-content-between mt-2 align-items-center">
                        <div className="form-check form-switch">
                            <input
                                form="editPostForm"
                                className="form-check-input cursor-pointer"
                                type="checkbox"
                                id="publicSwitch"
                                {...register("submissionOpen")}
                            />
                            <span className="text-500 me-2">Submission</span>
                        </div>
                        <input
                            form="editPostForm"
                            className="form-control"
                            type="date"
                            id="publicSwitch"
                            {...register("deadlineDate")}
                            style={{ maxWidth: "16rem" }}
                        />
                    </div>
                )}

                <form id="editPostForm" onSubmit={handleSubmit(onSave)}></form>
            </div>
        </div>
    );
};

export default EditPostCard;
