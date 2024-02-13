import axios from "axios";
import { APIBaseURL } from "./api-config";

function getClassroom(user){

    var config = {
        method: "get",
        url: APIBaseURL + "classroom",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
    };

    return axios(config)
}

export default getClassroom ;