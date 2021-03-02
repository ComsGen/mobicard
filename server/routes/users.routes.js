const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Bring in validation middleware
const validationMiddleware = require('../middlewares/validation.middleware');

// Bring in user model
const User = require('../models/user.model');

/**
 * @route POST /api/users/register
 * @description Register an account
 * @access public
 */
router.post('/register', validationMiddleware.register, async(req, res) => {
    const { first_name, last_name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err)
            return res.status(500).json({
                success: false,
                err
            });
        let newUser = new User({
            first_name,
            last_name,
            email,
            password: hash
        });

        newUser.save().then(() => {
            res.status(201).json({
                message: 'User registration was successful'
            })
        })
    })
});

/**
 * @route POST /api/users/login
 * @description Login to account
 * @access public
 */
router.post('/login', validationMiddleware.login, async(req, res) => {
    try {
        const { email, password } = req.body;
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                res.status(401).json({
                    message: 'Invalid login credentials',
                    success: false
                });
            } else {
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (!isMatch) {
                        res.status(401).json({
                            message: 'Invalid login credentials',
                            success: false
                        })
                    } else {
                        const token = jwt.sign({
                                userId: user._id,
                            },
                            process.env.JWT_KEY, {
                                expiresIn: '72h'
                            }
                        )
                        res.status(201).json({
                            user,
                            token,
                            success: true
                        })
                    }
                })
            }
        })
    } catch (error) {

    }
})

/**
 * @route GET api/users/profile
 * @description Retrieve user profile
 * @access private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), async(req, res) => {
    try {
        let user = req.user;
        if (user) {
            res.status(201).json({
                user,
                success: true
            })
        } else {
            res.status(401).json({
                message: 'Unauthorized',
                success: false
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})



module.exports = router;