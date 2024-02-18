import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import LandingController from './src/controllers/landing.controller.js';
import UserController from './src/controllers/user.controller.js'
import JobController from './src/controllers/job.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/fileupload.middleware.js';
import cookieParser from 'cookie-parser';
import {setLastVisit} from './src/middlewares/lastvisit.middleware.js'
import validateRequest from './src/middlewares/validation.middleware.js';
import updatevalidateRequest from './src/middlewares/updatevalidate.middleware.js'
const app=express();
//parse form data(decode data received from the form)
app.use(express.urlencoded({extended:true}));

//Setup view engine settings
app.set('view engine','ejs');
app.set("views",path.join(path.resolve(),"src","views"))

//setup ejslayouts middleware
app.use(ejsLayouts);
//configure session settings
app.use(session({
    secret:"SecretKey",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
//configure cookieparser
app.use(cookieParser());
app.use(setLastVisit);

//setting up static files
app.use(express.static("public"));
app.use(express.static('src/views'));



const landingscontroller=new LandingController();
const userscontroller=new UserController();
const jobscontroller=new JobController();


app.get('/',landingscontroller.getLandingPage);
app.get('/login',userscontroller.getLogin);
app.post('/login',userscontroller.postLogin);
app.post('/register',userscontroller.postRegister);
app.get('/jobs',jobscontroller.getJobs);
app.get('/postjob',auth,jobscontroller.getJobForm);
app.post('/jobs',validateRequest,jobscontroller.postJob);
app.get('/logout',userscontroller.logout);
app.get('/jobs/:id',jobscontroller.getjobdetails);
app.get('/delete-jobs/:id',auth,jobscontroller.deletejob);
app.get('/update-jobs/:id',auth,jobscontroller.getUpdateView);
app.post('/update-jobs',auth,updatevalidateRequest,jobscontroller.postupdatedjob);
app.post('/apply/:id',uploadFile.single('resume'),jobscontroller.postapplication);
app.get('/jobs/applicant/:id',auth,jobscontroller.getApplicants);
app.listen(3000,()=>{
    console.log('server is listening at port 3000')
});
