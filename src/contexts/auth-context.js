import {
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState, useEffect, createContext } from "react";
import { APIBaseURL } from "../api/api-config";
import { auth } from "../firebase-service";
import axios from "axios";
import qs from "qs";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password, role, displayName, enrollmentNumber="") => {
        let promise = new Promise(function (resolve, reject) {
            var data = qs.stringify({
                email,
                password,
                role,
                displayName ,
                enrollmentNumber,
            });
            var config = {
                method: "post",
                url: APIBaseURL + "signup",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(response);
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error.response); 
                    reject(error.response.data);
                });
        });

        return promise;
    };

    const signin = (email, password) => {
        let promise = new Promise(function (resolve, reject) {
            signInWithEmailAndPassword(auth, email, password)
                .then((ref) => {
                    resolve(ref);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    const signout = () => {
        return auth.signOut();
    };

    const passwordReset = (email) => {
        let promise = new Promise(function (resolve, reject) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    resolve(`Password Reset Email sent to ${email}`);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const value = {
        currentUser,
        signup,
        signin,
        signout,
        passwordReset,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
