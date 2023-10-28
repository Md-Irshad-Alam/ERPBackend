const express = require('express')
const routers = express.Router();
const checkSuperAdmin = require('../Middleware/Auth')
const LoginAuth = require('../Middleware/LoginAuth')
const {RemoveAdmin,
    ToggleToAdmin} = require('../Controls/UserControl')
const {login, register}  = require('../Controls/Login&Register')

    routers.post('/login', login)
    routers.post('/register', register)
    routers.put('/add-admin/:id', LoginAuth,  checkSuperAdmin,ToggleToAdmin )
    module.exports = routers