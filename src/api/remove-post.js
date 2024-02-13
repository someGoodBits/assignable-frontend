import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function removePost(user,classroomID,postID){

    let data = qs.stringify({classroomID})

    var config = {  
        method: "delete",
        url: APIBaseURL + "classroom/post/" + postID,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default removePost ;