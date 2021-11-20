import { BrowserRouter,Routes, Route } from "react-router-dom";
import { DASHBOARD_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from "./routes"; 

// Page Components
import SiginInPage from "./components/signin-page/signin-page";
import SignUpPage from "./components/signup-page/siginup-page";
import DashboardPage from "./components/dashboard-page/dashboard-page";
import DashboardClassroom from "./components/dashboard-page/dashboard-classroom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={DASHBOARD_ROUTE} element={<DashboardPage/>}>
                    <Route index element={<DashboardClassroom/>} />
                </Route>
                <Route path={SIGNIN_ROUTE} element={<SiginInPage/>} />
                <Route path={SIGNUP_ROUTE} element={<SignUpPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
