import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function getClassroomByID(user,classroomID){

    let data = qs.stringify({
        classroomID
    });

    var config = {
        method: "post",
        url: APIBaseURL + "classroom/byID",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data
    };

    return axios(config)
}

export default getClassroomByID ;