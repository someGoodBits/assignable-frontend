import { BrowserRouter,Routes, Route } from "react-router-dom";
import { 
    CLASSROOM_DASHBOARD_ROUTE, 
    CLASSROOM_ROUTE, 
    CLASSROOM_SETTINGS_ROUTE, 
    CLASSROOM_STUDENTS_REQUEST_LIST_ROUTE, 
    CLASSROOM_STUDENTS_ROUTE, 
    CREATE_ANNOUNCEMENT_ROUTE, 
    FORGOT_PASSWORD_ROUTE, 
    SIGNIN_ROUTE, 
    SIGNUP_ROUTE 
} from "./routes"; 


// Page Components
import SiginInPage from "./components/signin-page/signin-page";
import SignUpPage from "./components/signup-page/signup-page";
import ClassroomDashboard from "./components/dashboard-page/classroom-dashboard";
import ClassroomList from "./components/dashboard-page/classroom-list"; 
import Classroom from "./components/dashboard-page/classroom";
import ClassroomSection from "./components/dashboard-page/classroom-section";
import ClassroomStudents from "./components/dashboard-page/classroom-student";
import ClassroomSettings from "./components/dashboard-page/classroom-settings";
import { AuthProvider } from "./contexts/auth-context.js";
import ForgetPasswordPage from "./components/forget-password-page/forgot-password-page";
import { ToastContainer } from "react-toastify";
import ClassroomJoinRequests from "./components/dashboard-page/classroom-requests";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={CLASSROOM_DASHBOARD_ROUTE} element={<ClassroomDashboard/>}>
                        <Route index element={<ClassroomList/>} />
                        <Route path={CLASSROOM_ROUTE} element={<Classroom/>}>
                            <Route index element={<ClassroomSection/>} />
                            <Route path={CLASSROOM_STUDENTS_ROUTE} element={<ClassroomStudents/>} />
                            <Route path={CLASSROOM_SETTINGS_ROUTE} element={<ClassroomSettings/>} />
                            <Route path={CLASSROOM_STUDENTS_REQUEST_LIST_ROUTE} element={<ClassroomJoinRequests/>} />
                        </Route>
                    </Route>
                    <Route path={SIGNIN_ROUTE} element={<SiginInPage/>} />
                    <Route path={SIGNUP_ROUTE} element={<SignUpPage/>} />
                    <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgetPasswordPage/>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer position="bottom-center" theme="dark" />
        </AuthProvider>
    );
}

export default App;
