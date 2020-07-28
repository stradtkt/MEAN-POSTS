const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {id: '123456789', title: 'First Server Side Post', content: 'This is coming from the server'},
        {id: '123456780', title: 'Second Server Side Post', content: 'This is coming from the server'}
    ];
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;