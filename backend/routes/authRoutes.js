import express from "express"
import passport from "passport";
import dotenv from "dotenv"

dotenv.config();

const router = express.Router();

// Since there are no form submissions thats why we are using http get method instead of http post method

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }),
function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
});

router.get("/github/callback", passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_BASE_URL}/login` }),
function(req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
});

// to check if the router is authenticated or not
router.get("/check",(req,res)=>{
    if(req.user){
        res.send({user:req.user})
    }else{
        res.send({user:null})
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        res.json({message: "Logged Out"});
    });
});

export default router;