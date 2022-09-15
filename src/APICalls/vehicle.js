import { API } from '../backend';

export const AddVehicleAPICall = (operatorToken, user) => {
    console.log(user, "DATA", operatorToken)

    return fetch(`${API}/api/operator/auth/operator/vehicle/addvehicle`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": operatorToken
        },
        body: JSON.stringify(user)

    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}


export const GetAllVehicles = (operatorToken, limit, skip) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/operator/vehicle/showallOpvehicles?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            "x-auth-token": operatorToken
        },
    })
        .then(response => {
            //console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const GetAllVehiclesByDate = (operatorToken, date) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/operator/vehicle/showallOpvehicles/${date}`, {
        method: "GET",
        headers: {
            "x-auth-token": operatorToken
        },
    })
        .then(response => {
            //console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

//Get total no of vehicles in parking for the day
export const GetVehicleInfo = async (operatorToken) => {

    //console.log(true)
    try {
        const result = await fetch(`${API}/api/operator/auth/operator/info/getInfo`, {
            method: "GET",
            headers: {
                "x-auth-token": operatorToken
            }
        });
        // console.log(result);
        return result.json();
    } catch (err) {
        console.log(err)
    }
}

//Get operator earnings for the day
export const GetOperatorEarnings = (operatorToken) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/operator/info/getEarnings`, {
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

//Get operator earnings for the today (2 Slots)
export const GetOperatorEarningsSlot = (operatorToken) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/operator/info/getSlotEarnings`, {
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