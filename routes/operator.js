const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/:operatorName', (req, res) => {
    const { operatorName } = req.params;
    const filePath = path.join(__dirname, '../all_internet_packages/', `${operatorName}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `Operator ${operatorName} not found.` });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading the file.' });
        }
        const jsonData = JSON.parse(data);
        res.json({ data: jsonData.data });
    });
});

module.exports = router;
