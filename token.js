const axios = require("axios");

let getAccessToken = () => {
    let data = JSON.stringify({
        refresh_token: "da717348-8726-4d82-a10b-48f90f57dd09",
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://mapi.kianiranian.com/v1.0/auth/token",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios.request(config).then((response) => response.data.access_token);
};


module.exports = { getAccessToken };