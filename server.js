const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = 8003;

app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST',
}));

app.use('/api/operator/internet', require('./routes/operator'));
app.use('/api/package/check', require('./routes/checkInternetPackage'));

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
