import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function rejectJoinRequest(user,classroomID,studentID){

    let data = qs.stringify({
        classroomID,
        studentID
    });

    var config = {
        method: "post",
        url: APIBaseURL + "classroom/student/reject",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data
    };

    return axios(config)
}

export default rejectJoinRequest ;