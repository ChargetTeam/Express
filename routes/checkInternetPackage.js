const express = require("express");
const axios = require("axios");
const { getAccessToken } = require("../token");
const router = express.Router();




async function checkInternetPackageAPI({ operator, tel_num, tel_charger, package }) {
    if (!operator || !tel_num || !tel_charger || !package) {
        throw new Error("Missing required fields.");
    }

    const apiUrl = `https://mapi.kianiranian.com/v1.0/${operator}/internet-package/check`;

    const payload = {
        tel_num,
        tel_charger,
        package,
        store_name: "کیان شارژ",
    };

    try {
        const ACCESS_TOKEN = await getAccessToken(); // Resolve the token here
        const response = await axios.post(apiUrl, payload, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in checkInternetPackageAPI:", error.response?.data || error.message);
        if (error.response) {
            throw new Error(error.response.data || "Error from external API");
        } else {
            throw new Error("Internal Server Error");
        }
    }
}



router.post("/", async (req, res) => {
    try {
        const data = await checkInternetPackageAPI(req.body);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in /api/package/check route:", error.message, error.response?.data || "");
        res.status(500).json({
            error: error.message,
            details: error.response?.data || "Internal Server Error",
        });
    }
});



module.exports = router;
