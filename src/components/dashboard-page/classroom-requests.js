import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import getAllJoinRequests from "../../api/get-all-join-requests";
import { useAuth } from "../../contexts/auth-context";
import JoinRequestCard from "./common/join-request-card";

const ClassroomJoinRequests = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allRequests, setAllRequests] = useState([]);
    let params = useParams();
    let {currentUser} = useAuth();

    function removeEntry(id){
        let updatesEntries = allRequests.filter(entry => entry.id !== id) ;
        setAllRequests(updatesEntries);
    }

    useEffect(()=>{
        getAllJoinRequests(currentUser,params.classroomID).then((response)=>{
            setIsLoading(false);
            if(response.data.status){
                setAllRequests(response.data.message);
            } else {
                toast.error(response?.data?.message || "Oops! Something went wrong", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            }
        }).catch((error)=>{
            setIsLoading(false);
            console.log(error.response)
            toast.error(error?.response?.data?.message || "Oops! Something went wrong", {
                position: "bottom-center",
                autoClose: 5000,
            });
        })
    },[])

    return (
        <div>
            <div className="py-4 d-flex align-items-center justify-content-between">
                <h4 className="text-900">Join Requests</h4>
                <div className="dropdown position-relative"></div>
            </div>

            <div>

                {isLoading ? (
                    <div className="text-center w-100 mt-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : allRequests.length > 0 ? (
                    allRequests.map((request,i) => (
                        <div className="mb-2" key={i}>
                            <JoinRequestCard data={request} removeEntry={removeEntry}/>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-100 mt-3 text-500">No Join Requests</div>
                )}

            </div>
        </div>
    );
};

export default ClassroomJoinRequests;
