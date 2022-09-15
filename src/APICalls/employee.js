import {API} from "../backend"

export const EmployeeLogin = (user) => {
    return fetch(`${API}/api/operator/auth/operator/employee/signin`, {
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

export const AddEmployeeAPICall = (operatorToken, user) => {
    console.log(user,"DATA",operatorToken)
    
    return fetch(`${API}/api/operator/auth/operator/employee/add`, {
        method:"POST",
        headers: {
            'Content-Type' : 'application/json',
            "x-auth-token":operatorToken
        },
        body:JSON.stringify(user)
        
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}


export const GetAllEmployees = (operatorToken) => {
    console.log(true)
    return fetch(`${API}/api/operator/auth/operator/employee/get/employees`, {
        method:"GET",
        headers: {
            "x-auth-token":operatorToken
        },
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}
export const GetEmployeeById = (operatorToken,employeeid) => {
    console.log(true)
    return fetch(`${API}/api/operator/auth/operator/employee/${employeeid}`, {
        method:"GET",
        headers: {
            "x-auth-token":operatorToken
        }
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}