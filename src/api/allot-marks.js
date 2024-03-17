import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function allotMarks(user,classroomID,postID,studentID,points,submissionId){

    let data = qs.stringify({classroomID,postID,studentID,points,submissionId})

    var config = {  
        method: "post",
        url: APIBaseURL + "classroom/post/allotPoints",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default allotMarks ;