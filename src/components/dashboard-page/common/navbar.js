import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { useAuth } from "../../../contexts/auth-context";
import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router";
import { SIGNIN_ROUTE } from "../../../routes";

const Navbar = ({ navbarHeight }) => {
    const { currentUser, signout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/" + SIGNIN_ROUTE);
        }
    }, [currentUser,navigate]);

    function signUserOut(){
        signout().then(()=>{
            window.location.reload() ;
        })
    }

    return (
        <nav className="navbar shadow-sm bg-100" style={{ height: navbarHeight }}>
            <div className="container">
                <div className="navbar-brand d-flex align-items-center">
                    <Logo width="42" height="42" />
                    <span className="ms-2 text-900 fs-4 d-none d-md-block" style={{ fontWeight: 900, lineHeight: 0.8 }}>
                        assignable
                    </span>
                </div>
                <div className="flex-fill"></div>
                <div className="position-relative">
                    <div
                        className="d-flex align-items-center cursor-pointer justify-content-center rounded-circle bg-200"
                        style={{ width: "3rem", height: "3rem" }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        d="profile-dropdown"
                    >
                        {currentUser?.photoURL !== null ? (
                            <img href={currentUser?.photoURL} alt={currentUser?.displayName} />
                        ) : (
                            <FeatherIcon color="var(--bs-neutral-500)" icon="user" />
                        )}
                    </div>
                    <ul
                        className="dropdown-menu rounded-3 border-0 shadow-md mt-4 end-0 p-2"
                        aria-labelledby="profile-dropdown"
                        style={{left:"auto"}}
                    >
                        <li>
                            <div className="text-center cursor-pointer mb-2">
                                <div className="text-500">Signed in as </div>
                                <div className="text-500 fw-bold">{currentUser?.displayName}</div>
                            </div>
                        </li>
                        <li className="">
                            <div
                                onClick={signUserOut}
                                className="dropdown-item rounded-3 cursor-pointer py-2 d-flex align-items-center"
                            >
                                <FeatherIcon size="18px" color="var(--bs-neutral-500)" icon="log-out" />
                                <span className="ms-2">Sign out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
