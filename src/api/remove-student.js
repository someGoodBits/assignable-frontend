import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function removeStudent(user,classroomID,studentID){

    let data = qs.stringify({classroomID,studentID})

    var config = {
        method: "delete",
        url: APIBaseURL + "classroom/student/remove",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default removeStudent ;