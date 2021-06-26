const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest} = require('../middleware/auth')


//  @desc Auth with Google
// @route Get /auth/google
router.get('/', ensureGuest,(req,res) => {
    res.render('user_signin');
})

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard", ensureAuth,(req,res)=> {
    res.render('dashboard', {
        name: req.user.firstName,
        lname: req.user.lastName
    });
})


module.exports = router;
