const express = require("express");
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController } = require("../controllers/authController");
const {requireSignIn, isAdmin} = require("../middlewares/authMiddleware.js")
const router = express.Router();
//routing
//register || post
router.post('/register', async (req, res) => {
  await registerController(req, res);
});

//login || post
router.post('/login', async (req, res) => {
    await loginController(req, res);
  });

  //Forgot password
  router.post('/forgot-password',forgotPasswordController)

  //test routes
  router.get('/test', requireSignIn , isAdmin ,testController)

//protected user route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
  res.status(200).send({ok:true});
})

//protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
})
//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrdersController)
 

module.exports = router;