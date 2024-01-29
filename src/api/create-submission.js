import axios from "axios";
import { APIBaseURL } from "./api-config";

function createSubmission(user,classroomID,postID,file){

    let data = new FormData();
    data.append("classroomID",classroomID);
    data.append("postID",postID);
    data.append("file",file);

    var config = {  
        method: "post",
        url: APIBaseURL + "classroom/upload",
        headers: {
            "Content-Type": "multipart/form-data",
            token : "Bearer " + user?.accessToken,
        },
        data : data,
        params : {
            classroomID
        }
    };

    return axios(config)
}

export default createSubmission ;