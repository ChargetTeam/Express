
const axios = require("axios");
const fs = require("fs");
const { getAccessToken } = require("./server");

function saveToJsonFile(data, filePath) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log(`Data saved to ${filePath}`);
        }
    });
}

const operator = "shatel";

getAccessToken()
    .then((accessToken) => {
        const directory = "./all_internet_packages";
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const filePath = `./all_internet_packages/${operator}.json`;

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://mapi.kianiranian.com/v1.0/${operator}/internet-package/packages`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return axios.request(config).then((response) => {
            saveToJsonFile(response.data, filePath);
        });
    })
    .catch((error) => {
        console.error("Error:", error.message || error);
    });
