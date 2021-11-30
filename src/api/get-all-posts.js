import axios from "axios";
import { APIBaseURL } from "./api-config";

function getAllPosts(user, classroomID) {
    var config = {
        method: "get",
        url: APIBaseURL + "classroom/post",
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
export default getAllPosts;
