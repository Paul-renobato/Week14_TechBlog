const router = require("express").Router();
const {Post, Comment, User } = require("../../models/");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Comment.create({ ...req.body, user_id: req.session.userId})
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

module.exports = router