import { API } from '../backend';

//Get all the residents
export const GetResidents = (operatorToken) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/operator/get/residents`, {
        method: "GET",
        headers: {
            "x-auth-token": operatorToken
        },
    })
        .then(response => {
            // console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

//
export const AdResidentQR = (operatorToken, user) => {
    console.log(user, "DATA", operatorToken)

    return fetch(`${API}api/operator/auth/gateqr/add-gate-qr`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": operatorToken
        },
        body: user
        // JSON.stringify(user)

    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}
