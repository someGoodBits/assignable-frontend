import { useForm } from "react-hook-form";
import CustomInput from "../common/custom-input/custom-input";
import FeatherIcon from "feather-icons-react";
import updateClassroom from "../../api/update-classroom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import getClassroomByID from "../../api/get-classroom-by-id";
import removeClassroom from "../../api/remove-classroom";
import { CLASSROOM_DASHBOARD_ROUTE } from "../../routes";

const ClassroomSettings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetchClassroomInfo();
    }, []);

    function fetchClassroomInfo() {
        setIsFetching(true);
        getClassroomByID(currentUser, params.classroomID)
            .then((response) => {
                setIsFetching(false);
                if (response.data.status === "success") {
                    setValue("classroomName", response.data.message.classroomName);
                    setValue("classroomDescription", response.data.message.classroomDescription);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsFetching(false);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }

    function onSubmit(data) {
        setIsLoading(true);
        updateClassroom(currentUser, params.classroomID, data.classroomName, data.classroomDescription)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status === "success") {
                    toast.success("Classroom details uploaded successfully", {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
                    setTimeout(()=>{
                        window.location.reload()
                    },2000);
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
 
    function handleDelete(){
        setIsDeleting(true);
        removeClassroom(currentUser, params.classroomID)
            .then((response) => {
                setIsDeleting(false);
                navigate("/"+CLASSROOM_DASHBOARD_ROUTE);
            })
            .catch((error) => {
                setIsDeleting(false);
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
                <h4 className="text-900">Settings</h4>
                <div className="dropdown position-relative">
                    <button
                        className="btn btn-primary btn-48 rounded rounded-4 ps-2"
                        form="updateClassroomForm"
                        style={{ width: "12ch" }}
                        disabled={isLoading}
                    >
                        <FeatherIcon icon="save" />
                        {isLoading ? (
                            <div className="spinner-border spinner-border-sm text-white ms-4"></div>
                        ) : (
                            <span className="ms-3">Save</span>
                        )}
                    </button>
                </div>
            </div>
            <div>
                {isFetching ? (
                    <div className="text-center w-100 mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : (
                    <div className="card border-0 rounded-5 shadow-sm p-3">
                        <div className="fs-5 text-900 fw-bolder mb-3">Classroom</div>
                        <form onSubmit={handleSubmit(onSubmit)} id="updateClassroomForm">
                            <div>
                                <CustomInput
                                    name="classroomName"
                                    label="Classroom Name"
                                    type="text"
                                    placeholder="Enter Classroom Name"
                                    errors={errors}
                                    register={register}
                                    required
                                />
                                <div className="d-none d-md-block" style={{ minWidth: "20rem" }}></div>
                            </div>
                            <div className="mt-2">
                                <CustomInput
                                    name="classroomDescription"
                                    label="Classroom Description"
                                    type="text"
                                    placeholder="Enter Classroom Description"
                                    errors={errors}
                                    register={register}
                                    required
                                />
                                <div className="d-none d-md-block" style={{ minWidth: "20rem" }}></div>
                            </div>
                            <div className="mt-3 d-flex justify-content-center">
                                <button
                                    className="btn btn-danger btn-48 rounded rounded-4 ps-2"
                                    onClick={handleDelete}
                                    type="button"
                                    disabled={isDeleting}
                                >
                                    <FeatherIcon icon="save" />
                                    {isDeleting ? (
                                        <div className="spinner-border spinner-border-sm text-white ms-4"></div>
                                    ) : (
                                        <span className="ms-3">Delete this Classroom</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassroomSettings;
