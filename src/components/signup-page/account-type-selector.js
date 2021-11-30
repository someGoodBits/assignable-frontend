import StudentImage from "../../assets/images/student.png";
import TeacherImage from "../../assets/images/teacher.png";
import "./account-type-selector.scss";

const AccountTypeSelector = ({ accountType, setAccountType, teacherRole, studentRole }) => {
    return (
        <div className="d-flex">
            <div className="me-2 flex-fill">
                <div
                    className="d-flex flex-column flex-sm-row p-3 rounded-3 align-items-center cursor-pointer account-type-card"
                    onClick={() => setAccountType(teacherRole)}
                    data-state={accountType === teacherRole ? "active" : ""}
                >
                    <div className="rounded-circle border-3 border-neutral-900 account-type-card-image-container">
                        <img width="48" height="48" src={TeacherImage} alt="Teacher" />
                    </div>
                    <span className="ms-sm-3 fw-bolder text-center mt-4 mt-sm-0">I am a Teacher</span>
                </div>
            </div>
            <div className="ms-2 flex-fill">
                <div
                    className="d-flex flex-column flex-sm-row p-3 rounded-3 align-items-center cursor-pointer account-type-card"
                    onClick={() => setAccountType(studentRole)}
                    data-state={accountType === studentRole ? "active" : ""}
                >
                    <div className="rounded-circle border-3 border-neutral-900 account-type-card-image-container">
                        <img width="48" height="48" src={StudentImage} alt="Student" />
                    </div>
                    <span className="ms-sm-3 fw-bolder text-center mt-4 mt-sm-0">I am a Student</span>
                </div>
            </div>
        </div>
    );
};

export default AccountTypeSelector;
