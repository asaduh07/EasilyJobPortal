

export default class LandingController{
    getLandingPage(req,res){
        res.render('landing',{errorMessage:null,userEmail:req.session.userEmail,userName:req.session.userName});
    }
}