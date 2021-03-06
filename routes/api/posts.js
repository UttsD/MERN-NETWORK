const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");


const {
    check,
    validationResult
} = require('express-validator');


// @route POST api/posts
// @desc  Create Post
// @acces Private
router.post('/', [auth,
        check('text', 'text is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }



        try {

            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();
            res.json(post);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error!')
        }
    });

// @route GET api/posts
// @desc  Get all Post
// @acces Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({
            date: -1
        });
        res.json(posts)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error!')
    }
});
// @route GET api/posts/:id
// @desc  Get Post by ID
// @acces Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                msg: 'Post not found'
            })
        }

        res.json(post)

    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Post not found'
            })
        }
        res.status(500).send('Server Error!')
    }
});

// @route DELETE api/posts/:id
// @desc  DELETE a Post by ID
// @acces Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                msg: 'Post not found'
            })
        }
        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized'
            })
        }

        await post.remove();

        res.json({
            msg: 'Post removed'
        })

    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Post not found'
            })
        }
        res.status(500).send('Server Error!')
    }
});

// @route PUT api/posts/like/:id
// @desc  add like to a Post by ID
// @acces Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Check if the post has already been liked by this user 

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                msg: 'Already liked'
            })
        }

        post.likes.unshift({
            user: req.user.id
        });

        await post.save();

        res.json(post)




    } catch (err) {
        console.log(err.message);

        res.status(500).send('Server Error!')
    }
});

// @route PUT api/posts/unlike/:id
// @desc  add like to a Post by ID
// @acces Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Check if the post has already been liked by this user 

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
                msg: 'Not liked'
            })
        }

        // Get remove Index
        const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));

        post.likes.splice(removeIndex, 1);


        await post.save();

        res.json(post)

    } catch (err) {
        console.log(err.message);

        res.status(500).send('Server Error!')
    }
});


// @route POST api/posts/comments/:id
// @desc  Add a comment on a post
// @acces Private
router.post('/comments/:id', [auth,
        check('text', 'text is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {

            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            await post.save();
            res.json(post);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error!')
        }
    });

// @route DELETE api/posts/comments/:id/:comment_id
// @desc  Delete a comment 
// @acces Private
router.delete('/comments/:id/:comment_id', auth,
    async (req, res) => {

        try {

           
            const post = await Post.findById(req.params.id);
            const comment = post.comments.find(comment => comment.id === req.params.comment_id)
            // Make sure comment exist
            if(!comment) {
                return res.status(404).json({msg: 'Comment does not exist'});
            }

            //Check user
            if(comment.user.toString() !== req.user.id){
                return res.status(401).json({msg: 'User not authorized'});
            }

            // get remove index
            const removeIndex = post.comments
            .map(comment => comment.user.toString()
            .indexOf(req.user.id));

            post.comments.splice(removeIndex, 1);

            await post.save();
            res.json(post);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error!')
        }
    });

module.exports = router;