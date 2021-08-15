const router = require("express").Router();
const {Post, Comment, User } = require("../models/");
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
          where: {
              user_id: req.session.userId
          }
      });
      res.render("all-posts", { 
          layout: 'dashboard',
          postData
         });
    } catch (err) {
      res.status(500).json(err);
      res.redirect('login');
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    })
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, Comment }]
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post found with this id!' });
            return;
        }
        res.render("edit-post", {
            layout: 'dashboard',
             postData 
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
