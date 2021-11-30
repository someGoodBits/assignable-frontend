import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import getStudents from "../../api/get-students";
import { useAuth } from "../../contexts/auth-context";
import EnrolledStudentsCard from "./common/enrolled-student-card";

const ClassroomStudents = () => {
    const { currentUser } = useAuth();
    const params = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [allStudents, setAllStudents] = useState([]);

    function removeEntry(id){
        let updatesEntries = allStudents.filter(entry => entry.id !== id) ;
        setAllStudents(updatesEntries);
    }

    useEffect(() => {
        setIsFetching(true);
        getStudents(currentUser, params.classroomID)
            .then((response) => {
                setIsFetching(false);
                if (response.data.status) {
                    setAllStudents(response.data.message);
                } else {
                    toast.error(response?.data?.message || "Oops! Something went wrong", {
                        position: "bottom-center",
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                setIsFetching(false);
                console.log(error.response);
                toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            });
    }, []);

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Enrolled Students</h4>
                <div className="dropdown position-relative"></div>
            </div>

            <div>
                {isFetching ? (
                    <div className="text-center w-100 mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : allStudents.length > 0 ? (
                    allStudents.map((student, i) => (
                        <div className="mb-2" key={i}>
                            <EnrolledStudentsCard data={student} removeEntry={removeEntry}/>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-100 mt-3 text-500">No Join Requests</div>
                )}
            </div>
        </div>
    );
};

export default ClassroomStudents;
