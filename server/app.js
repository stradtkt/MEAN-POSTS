const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const app = express();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://kevin1234:kevin1234@cluster0.dx1q3.mongodb.net/posts_db?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post created successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(201).json({
                message: 'Post created successfully',
                posts: documents
            }); 
        });
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