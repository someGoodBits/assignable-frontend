import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function removeClassroom(user,classroomID){
    console.log({classroomID})
    var config = {
        method: "delete",
        url: APIBaseURL + "classroom/" + (classroomID || ""),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
    };

    return axios(config)
}

export default removeClassroom ;