import UserModel from '../model/user.model.js'
import JobModel from '../model/job.model.js';
export default class UserController{
    getLogin(req,res){
        res.render('login');
    }
    postLogin(req,res){
        const {email,password}=req.body;
       const user= UserModel.isValidUSer(email,password);
       if(!user){
           res.render('404page',{errorMessage:"user not found pls register"})
       }else{
           let jobs=JobModel.getAllJobs();
           req.session.userEmail=email;
           res.render('landing',{jobs,userEmail:req.session.userEmail,userName:req.session.userName});

       }
       
    }

    logout(req,res){
        req.session.destroy(err=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login')
            }
        });
        res.clearCookie('lastVisit');
    }
    postRegister(req,res){
        const {name,email,password}=req.body;
        req.session.userName=name;
        UserModel.addUser(name,email,password);
        res.render('login');
    }


}