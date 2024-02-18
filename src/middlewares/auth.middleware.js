export const auth=(req,res,next)=>{
    if(req.session.userEmail){
        next();

    }else{
        res.render('404page',{errorMessage:"Only recruiter is allowed to access this page, login as recruiter to continue"});
    }


}