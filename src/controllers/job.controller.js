import JobModel from '../model/job.model.js'
import sendmail from'../middlewares/mail.middleware.js';
export default class JobController{
    getJobs(req,res){
        const jobs=JobModel.getAllJobs();
        res.render('jobs',{jobs,userEmail:req.session.userEmail,userName:req.session.userName});
    }
    getJobForm(req,res){
        res.render('postjob',{errorMessage:null,userEmail:req.session.userEmail,userName:req.session.userName});
    }
    postJob(req,res){
        const{jobcategory,
            jobdesignation,
            joblocation,
            companyname,
            salary,
            numberofopenings,
            skillsrequired,
            applyby}=req.body;
        const jobs=JobModel.getAllJobs();
        JobModel.addJob(jobcategory,
            jobdesignation,
            joblocation,
            companyname,
            salary,
            numberofopenings,
            skillsrequired,
            applyby);
        res.render('jobs',{jobs,userEmail:req.session.userEmail,userName:req.session.userName})
        
    }

    getjobdetails(req,res){
        const id= req.params.id;
        const job=JobModel.getJobById(id)
        if(job){
           return res.render('jobdetail',{job,userEmail:req.session.userEmail,userName:req.session.userName});
        }else{
            return res.render('404page',{errorMessage:'Job not found',userEmail:req.session.userEmail,userName:req.session.userName})
        }

    }
    deletejob(req,res){
        const id=req.params.id;
        const job=JobModel.getJobById(id);
        if(!job){
           return res.render('404page',{errorMessage:'Job not found',userEmail:req.session.userEmail,userName:req.session.userName})
        }
        JobModel.deleteJobById(id);
        const jobs=JobModel.getAllJobs();
        return res.render('jobs',{jobs,userEmail:req.session.userEmail,userName:req.session.userName})


    }
    getUpdateView(req,res){
        const id=req.params.id;
        const job=JobModel.getJobById(id);
        if(!job){
            return res.render('404page',{errorMessage:'Job not found',})
        }
        console.log(job);
        res.render('update-job',{errorMessage:null,job,userEmail:req.session.userEmail,userName:req.session.userName})
    }

    postupdatedjob(req,res){
        JobModel.updateJob(req.body);
        const jobs=JobModel.getAllJobs();
        return res.render('jobs',{jobs,userEmail:req.session.userEmail,userName:req.session.userName})

    }

    postapplication(req,res){
        const id=req.params.id;
        const resume="resume/"+req.file.filename
        JobModel.applytojob(req.body,resume,id);
        const {email}=req.body;
        sendmail(email);
        const jobs=JobModel.getAllJobs();
        return res.render('jobs',{jobs,userEmail:req.session.userEmail,userName:req.session.userName})


    }
    getApplicants(req,res){
        const id=req.params.id;
        const applicants=JobModel.sendApplicantsbyJobId(id);
        res.render('applicants',{applicants,userEmail:req.session.userEmail,userName:req.session.userName})

    }
}