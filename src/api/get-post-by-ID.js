import axios from "axios";
import { APIBaseURL } from "./api-config";

function getPostByID(user,classroomID,postID){

    var config = {  
        method: "get",
        url: APIBaseURL + "classroom/post/" + (postID || ""),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        params : {
            classroomID
        }
    };

    return axios(config)
}

export default getPostByID ;