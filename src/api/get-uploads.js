import axios from "axios";
import { APIBaseURL } from "./api-config";

function getUploads(user,classroomID,postID){

    var config = {
        method: "get",
        url: APIBaseURL + "classroom/uploads",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        params : {
            classroomID,
            postID
        }
    };

    return axios(config)
}

export default getUploads ;