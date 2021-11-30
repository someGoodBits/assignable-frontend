import axios from "axios";
import { APIBaseURL } from "./api-config";

function getUserProfile(user){
    var config = {
        method: "get",
        url: APIBaseURL + "user/profile",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token : "Bearer " + user?.accessToken
        },
    };

    return axios(config)
}

export default getUserProfile ;