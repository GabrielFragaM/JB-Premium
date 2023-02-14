import {userDetails} from "./userDetails";
import {refreshToken} from "./refreshTokenApi";


export async function callApi(url, method, body) {
    
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const headers = userDetails !== null ? {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + userDetails.token
    }: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer"
    };

    const requestOptionsBody = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    };

    const requestOptions = {
        method: method,
        headers: headers,
    };

    return await fetch(url, method !== 'GET' ? requestOptionsBody: requestOptions)
        .then(async response => {
            console.log(response)
            if(response.status === 401){
                let checkRefreshToken = await refreshToken();
                if(checkRefreshToken === false){
                    sessionStorage.setItem('authDetails', null);
                }
                window.location.reload();
            }
            try{
                const data = await response.json();

                return {'result': data, 'responseStatus': response.status};
            }catch(error){
                if(response.status === 429){
                    await sleep(parseInt('5000'));
                    return {'result': [], 'responseStatus': response.status, 'error': error.toString()};
                }else{
                    return {'result': [], 'responseStatus': response.status, 'error': error.toString()};
                }
            }
        }).catch(error => {
            return {'result': [], 'responseStatus': error, 'error': 'Error'}
        });
}
