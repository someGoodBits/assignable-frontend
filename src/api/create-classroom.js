import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function createClassroom(user,classroomName,classroomDescription){

    let data = qs.stringify({classroomName,classroomDescription})

    var config = {  
        method: "post",
        url: APIBaseURL + "classroom",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default createClassroom ;