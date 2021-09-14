const { post } = require("../routes/feed");

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        res.status(200).json({
            message: "Fetched posts successfully.",
            posts: posts
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const name = req.body.creator.name;
    const post = new Post({
        title: title,
        content: content,
        creator: {name: name},
    });

    post.save().then(result => {
        res.status(200).json({
            message: 'Post created successfully!',
            post: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err.statusCode);
        next(err);
    })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Could not find post.');
            error.status = 404;
            throw error;
        }
        return Post.findByIdAndRemove(postId);
    })
    .then(result => {
        res.status(200).json({message: "Post is successfully deleted."});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err.statusCode);
        next(err);
    })
}

exports.editPost = (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const name = req.body.creator.name;

    Post.findById(postId) // mongoose built in function
    .then(post => {
        if (!post) {
            const error = new Error('Could not find post.');
            error.status = 404;
            throw error;
        }

        post.title = title;
        post.content = content;
        post.creator.name = name;
        return post.save();
    })
    .then(result => {
        res.status(200).json({message: 'Post updated!', post: result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        // console.log(err.statusCode);
        next(err);
    })
}