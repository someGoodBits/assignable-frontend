import { Outlet } from "react-router";
import Navbar from "../common/navbar/navbar";

const navbarHeight = "5rem" ;

const DashboardPage = () => {

    return ( 
    <div>
        <Navbar navbarHeight={navbarHeight} />
        <main>
            <Outlet />
        </main>
    </div> );
}
 
export default DashboardPage;