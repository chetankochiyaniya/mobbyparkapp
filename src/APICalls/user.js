import {API} from '../backend'

export const AddUserAPICall = (operatorToken, user) => {
    console.log(user)
    return fetch(`${API}/api/operator/auth/users/adduser`, {
        method:"POST",
        headers: {
            "x-auth-token":operatorToken
        },
        body:user
        
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}
