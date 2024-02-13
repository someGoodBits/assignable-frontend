import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../common/custom-input/custom-input";

const CreateAnnouncementModal = ({setModalVisibility}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(data){
        console.log(data);
    }

    return (
        <div className="position-fixed top-0 start-0 vw-100 vh-100">
            <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: "1" }}>
                <div className="card p-3 border-0 rounded-4 shadow-lg">
                    <div className="card-title fw-900 fs-4 text-primary text-center mt-3 mb-4">Create Post</div>
                    <div className="card-body p-0">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <CustomInput
                                    name="classroomID"
                                    label="Classroom Code"
                                    type="text"
                                    placeholder="Enter Classroom Code"
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
                onClick={()=>{setModalVisibility(false)}}
            >
            </div>
        </div>
    );
};

export default CreateAnnouncementModal;
