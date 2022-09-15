import {API} from '../backend'

export const AddGateQRAPICall = (operatorToken, user) => {
    console.log(user,"DATA",operatorToken)
    
    return fetch(`${API}api/operator/auth/gateqr/add-gate-qr`, {
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


export const GetGateList = (operatorToken) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/gateqr/get-gate-qr`, {
        method:"GET",
        headers: {
            "x-auth-token":operatorToken
        },
    })
    .then(response => {
        //console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}