import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function editPost(user,classroomID,postID,postData){

    let data = qs.stringify({classroomID,postID,...postData})

    var config = {  
        method: "patch",
        url: APIBaseURL + "classroom/post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default editPost ;