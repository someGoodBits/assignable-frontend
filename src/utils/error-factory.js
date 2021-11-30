
export default function getErrorMessage(errorCode) {
    switch(errorCode){
        case "auth/user-not-found" : return "User not Found" ;
        case "auth/email-already-exists" : return "Email is already in use" ;
        case "auth/id-token-expired" : return "Auth Session Expired" ;
        case "auth/invalid-email" : return "Email is Invalid" ;
        case "auth/invalid-password" : return "Password is Invalid" ;
        default : return errorCode ;
    }
}