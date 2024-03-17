import CustomInput from "../common/custom-input/custom-input";
import Header from "../common/header";
import { useForm } from "react-hook-form";
import AccountTypeSelector from "./account-type-selector";
import "./signup-page.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLASSROOM_DASHBOARD_ROUTE, SIGNIN_ROUTE } from "../../routes";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import { auth } from "../../firebase-service";
import { signInWithEmailAndPassword } from "firebase/auth";
import { STUDENT_ROLE, TEACHER_ROLE } from "../../global";
import getErrorMessage from "../../utils/error-factory";

const headerHeight = "5rem";

const SignUpPage = () => {
    const { currentUser, signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(currentUser){
            navigate("/"+CLASSROOM_DASHBOARD_ROUTE);
        }
    },[currentUser,navigate])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [accountType, setAccountType] = useState(TEACHER_ROLE);

    function onSubmit(data) {
        setIsLoading(true);
        signup(data.email, data.password, accountType, data.name, data?.enrollmentNumber).then(
            () => {
                setIsLoading(false);
                toast.success("Signup Successfull", {
                    position: "bottom-center",
                    autoClose: 2000,
                });
                let loginPromise = signInWithEmailAndPassword(auth, data.email, data.password) ;
                toast.promise(
                    loginPromise,
                    {
                        pending: "Signing in",
                        success: "Signin Successfull",
                        error: "Oops! Something went wrong try again",
                    },
                    {
                        position: "bottom-center",
                        autoClose: 2000,
                    }
                );

                loginPromise.then(()=>{
                    navigate("/" + CLASSROOM_DASHBOARD_ROUTE) ;
                })
            },
            (error) => {
                setIsLoading(false);
                toast.error(getErrorMessage(error.message), {
                    position: "bottom-center",
                    autoClose: 5000
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
                    <div className="card-title fw-900 fs-4 text-primary text-center mt-3 mb-4">Create an Account</div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <AccountTypeSelector
                                    accountType={accountType}
                                    setAccountType={setAccountType}
                                    teacherRole={TEACHER_ROLE}
                                    studentRole={STUDENT_ROLE}
                                />
                            </div>

                            <div className="row g-3">
                                <div className="col-sm">
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
                                <div className="col-sm">
                                    <CustomInput
                                        name="name"
                                        label="Name"
                                        type="text"
                                        placeholder="Enter your name"
                                        errors={errors}
                                        register={register}
                                        required
                                    />
                                    <div className="d-none d-md-block" style={{ minWidth: "18rem" }}></div>
                                </div>
                            </div>
                            <div className="row g-3 mt-0">
                                <div className="col-sm">
                                    <CustomInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        placeholder="Enter your secret"
                                        errors={errors}
                                        register={register}
                                        required
                                    />
                                    <div className="d-none d-md-block" style={{ minWidth: "18rem" }}></div>
                                </div>
                                <div className={accountType === STUDENT_ROLE ? "col-sm" : "col-sm d-none d-sm-block"}>
                                    {accountType === STUDENT_ROLE && (
                                        <CustomInput
                                            name="enrollmentNumber"
                                            label="Enrollment Number"
                                            type="text"
                                            placeholder="Enter your enrollment number"
                                            errors={errors}
                                            register={register}
                                            required
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex flex-md-row flex-column align-items-center">
                                    <div className="text-center">
                                        <span className="text-500 fw-bold">Already have an account?</span>
                                        <Link to={"/" + SIGNIN_ROUTE}>
                                            <span className="text-primary fw-bolder mx-1 text-nowrap">Sign in</span>
                                        </Link>
                                        <span className="text-500 fw-bold">instead</span>
                                    </div>
                                    <div className="flex-fill"></div>
                                    <button
                                        type="submit"
                                        className="btn d-flex justify-content-center btn-primary btn-48 rounded rounded-4 mt-2 mt-md-0"
                                        style={{ width: "10ch" }}
                                    >
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm text-white"></div>
                                        ) : (
                                            <span>Sign up</span>
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

export default SignUpPage;
