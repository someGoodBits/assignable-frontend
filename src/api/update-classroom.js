import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function updateClassroom(user,classroomID,classroomName,classroomDescription){

    let data = qs.stringify({classroomID,classroomName,classroomDescription})

    var config = {
        method: "patch",
        url: APIBaseURL + "classroom",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default updateClassroom ;