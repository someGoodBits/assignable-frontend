import CustomInput from "../common/custom-input/custom-input";
import Header from "../common/header";
import { useForm } from "react-hook-form";
import "../signup-page/signup-page.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLASSROOM_DASHBOARD_ROUTE, FORGOT_PASSWORD_ROUTE, SIGNUP_ROUTE } from "../../routes";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import getErrorMessage from "../../utils/error-factory";

const headerHeight = "5rem";

const SiginInPage = () => {
    const { currentUser, signin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/" + CLASSROOM_DASHBOARD_ROUTE);
        }
    }, [currentUser, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        setIsLoading(true);
        signin(data.email, data.password).then(
            () => {
                setIsLoading(false);
                toast.success("Signin Successfull", {
                    position: "bottom-center",
                    autoClose: 2000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
            (error) => {
                setIsLoading(false);
                toast.error(getErrorMessage(error.code), {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            }
        );
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
                    <div className="card-title fw-900 fs-4 text-primary text-center mt-3 mb-4">Welcome</div>
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
                                <div className="d-none d-md-block" style={{ minWidth: "18rem" }}></div>
                            </div>
                            <div className="mt-3">
                                <CustomInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your secret"
                                    errors={errors}
                                    register={register}
                                    required
                                />
                                <div className="d-none d-md-block" style={{ minWidth: "20rem" }}></div>
                            </div>

                            <div className="mt-3">
                                <Link className="text-decoration-none" to={"/" + FORGOT_PASSWORD_ROUTE}>
                                    <span className="text-500 fw-bold cursor-pointer">Forgot password?</span>
                                </Link>
                            </div>

                            <div className="mt-3">
                                <div className="d-flex flex-md-row flex-column align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-hollow d-flex justify-content-center btn-48 rounded rounded-4 mt-2 mt-md-0"
                                        onClick={() => {
                                            navigate("/" + SIGNUP_ROUTE);
                                        }}
                                        style={{ flex: "1 0" }}
                                    >
                                        <span>Sign up</span>
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn d-flex justify-content-center btn-primary btn-48 ms-3 rounded rounded-4 mt-2 mt-md-0"
                                        style={{ flex: "1 0" }}
                                    >
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm text-white"></div>
                                        ) : (
                                            <span>Sign in</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiginInPage;
