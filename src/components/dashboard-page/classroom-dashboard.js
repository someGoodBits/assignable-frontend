import { Outlet } from "react-router";
import Navbar from "./common/navbar";

const navbarHeight = "5rem";

const ClassroomDashboard = () => {
    return (
        <div>
            <Navbar navbarHeight={navbarHeight} />
            <main>
                <div className="container-sm">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ClassroomDashboard;
