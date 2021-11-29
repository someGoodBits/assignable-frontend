import CustomInput from "../common/custom-input/custom-input";
import Header from "../common/header";
import { useForm } from "react-hook-form";
import "../signup-page/signup-page.scss";
import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { ToastContainer, toast } from "react-toastify";

const headerHeight = "5rem";

const ForgetPasswordPage = () => {
    const { passwordReset } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        setIsLoading(true);
        passwordReset(data.email).then(
            ()=>{
                setIsLoading(false);
                toast.success("Password Rest Link Has been Sent to Your Email", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            ()=>{
                setIsLoading(false);
                toast.error("Oops something went wrong Try Again", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        )
    }


    return ( 
        <div className="bg-primary" style={{ width: "100%", minHeight: "100vh" }}>
            <div className="top-0 w-100 header-container">
                <div className="container-sm ">
                    <Header height={headerHeight} />
                </div>
            </div>
            <div className="d-md-flex align-items-center justify-content-center p-3" style={{ minHeight: "100vh" }}>
                <div className="card rounded-5 shadow-lg p-3">
                    <div className="card-title fw-900 fs-4 text-primary text-center mt-3 mb-4">
                        Don't worry we got your back!
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="">
                                <CustomInput
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    errors={errors}
                                    register={register}
                                    required
                                />
                                <div className="d-none d-md-block" style={{ minWidth: "24rem" }}></div>
                            </div>
                            
                            <div className="mt-3">
                                <div className="d-flex flex-md-row flex-column align-items-center justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn d-flex justify-content-center btn-primary btn-48 rounded rounded-4 mt-2 mt-md-0"
                                        style={{ minWidth: "18rem" }}
                                    >
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm text-white"></div>
                                        ) : (
                                            <span>Send Password Rest Link</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-center" theme="dark" />
        </div>
    );
}
 
export default ForgetPasswordPage;