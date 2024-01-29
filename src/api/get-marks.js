import axios from "axios";
import { APIBaseURL } from "./api-config";

function getMarks(user,classroomID,postID,studentID){

    var config = {  
        method: "get",
        url: APIBaseURL + "classroom/post/getPoints",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        params : {
            classroomID,
            postID,
            studentID
        }
    };

    return axios(config)
}

export default getMarks ;