const express = require('express');
const app = express();

app.use((req, res, next) => {
    if (req.query.name) {
        return res.status(200).json({
            message: `Hello ${req.query.name}`
        });
    }

    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello world'
    });
})

app.listen(3000, () => console.log('API listening on http://localhost:3000'));
