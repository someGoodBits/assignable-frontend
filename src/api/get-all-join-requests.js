import axios from "axios";
import { APIBaseURL } from "./api-config";

function getAllJoinRequests(user, classroomID) {
    var config = {
        method: "get",
        url: APIBaseURL + "classroom/requests",
        headers: {
            token:  "Bearer " + user?.accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        params : {
            classroomID
        }
    };

    return axios(config)
}
export default getAllJoinRequests;
