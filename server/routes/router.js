
const express=require('express')
const route=express.Router()

const services=require('../services/render')
const controller=require('../controller/controller')

/**
 * @description Root Route
 * @method GET/
 */


route.get('/',services.homeRoutes)

/**
 * @description add-user Route
 * @method GET/
 */

route.get('/add-user',services.add_user)

/**
 * @description update-user Route
 * @method GET/
 */

route.get('/update-user',services.update_user)


//API

route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)
route.get('/api/find',controller.find)
route.get('/api/login',controller.login)
route.post('/api/login',controller.loginSubmit)
route.get('/api/home',controller.home);
route.get('/api/logout',controller.logout)
route.get('/api/register',controller.register)
route.post('/api/register', controller.registerSubmit)
route.get('/api/search',controller.searchUser)

module.exports=route