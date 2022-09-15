import {API} from '../backend'

//LOGIN
export const Login = user => {
    console.log(API,"received")
    return fetch(`${API}/api/operator/auth/operator/signin`,{
        method:"POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        if(response.status==200)
        {
            sessionStorage.setItem("login","true") 
           
        }
        else{
            sessionStorage.setItem("login","false");
        }
        return response.json()
    })
    .catch(err =>
        {
            sessionStorage.setItem("login","false")
            console.log(err)
        })
}

//LOGOUT
export const Logout = next => {
    if(typeof window !== "undefined" ){
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/api/operator/auth/operator/signout`, {
            method:"GET"
        })
        .then(response => console.log("SignOut Success"))
        .catch(err => console.log(err));
    }
};
//GET USER
export const getOperatorById = (operatorId) => {
    return fetch(`${API}/api/operator/auth/operator/${operatorId}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
//AUTHENTICATE
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

//isAUTH
export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}
