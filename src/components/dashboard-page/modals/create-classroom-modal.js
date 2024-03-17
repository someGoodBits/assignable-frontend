import { useState } from "react";
import { useForm } from "react-hook-form";
import createClassroom from "../../../api/create-classroom";
import { useAuth } from "../../../contexts/auth-context";
import CustomInput from "../../common/custom-input/custom-input";
import { toast } from "react-toastify";

const CreateClassroomModal = ({ setModalVisibility }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();

    function onSubmit(data) {
        setIsLoading(true);
        createClassroom(currentUser, data.classroomName, data.classroomDescription)
            .then((response) => {
                setIsLoading(false);
                toast.success("Classroom Created Successfully", {
                    position: "bottom-center",
                    autoClose: 2000,
                });
                setModalVisibility(false);
                location.reload();
                console.log(response);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    return (
        <div className="position-fixed top-0 start-0 vw-100 vh-100">
            <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: "1" }}>
                <div className="card p-3 border-0 rounded-4 shadow-lg">
                    <div className="card-title fw-900 fs-4 text-primary text-center mt-3 mb-4">Create Classroom</div>
                    <div className="card-body p-0">
                        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "20rem" }}>
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
                            <div className="mt-2">
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-hollow d-flex justify-content-center btn-48 rounded rounded-4 mt-2 mt-md-0"
                                        onClick={() => {
                                            setModalVisibility(false);
                                        }}
                                        style={{ flex: "1 0" }}
                                    >
                                        <span>Cancel</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn d-flex justify-content-center btn-primary btn-48 ms-0 ms-md-2 rounded rounded-4 mt-2 mt-md-0"
                                        style={{ flex: "1 0" }}
                                    >
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm text-white"></div>
                                        ) : (
                                            <span>Create</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                className="bg-black position-absolute top-0 start-0 w-100 h-100"
                style={{ opacity: "0.25" }}
                onClick={() => {
                    setModalVisibility(false);
                }}
            ></div>
        </div>
    );
};

export default CreateClassroomModal;
