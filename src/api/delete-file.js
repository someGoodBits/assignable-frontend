import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function deleteFile(user,classroomID,postID,uploadID,filePath){

    let data = qs.stringify({classroomID,postID,uploadID,filePath})

    var config = {
        method: "delete",
        url: APIBaseURL + "classroom/upload",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default deleteFile ;