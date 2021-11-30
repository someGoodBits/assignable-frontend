import axios from "axios";
import { APIBaseURL } from "./api-config";
import qs from "qs" ;

function createPost(user,postType,description){

    let data = qs.stringify({postType,description})

    var config = {  
        method: "post",
        url: APIBaseURL + "classroom/post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
        data : data
    };

    return axios(config)
}

export default createPost ;