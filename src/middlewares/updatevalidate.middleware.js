import {body,validationResult} from 'express-validator';
const updatevalidateRequest=async(req,res,next)=>{
    const rules=[
        body('jobcategory').notEmpty().withMessage("Job Category is required"),
        body('jobdesignation').notEmpty().withMessage("Job Designation is required"),
        body('joblocation').notEmpty().withMessage('Job Location is required'),
        body('companyname').notEmpty().withMessage('Company Name is required'),
        body('salary').notEmpty().withMessage('Salary  is required'),
        body('numberofopenings').notEmpty().withMessage('Field  is required'),
        body('skillsrequired').notEmpty().withMessage('Skills  cannot be empty'),
        body('applyby').notEmpty().withMessage('Date cannot be empty'),
        body('applyby').isDate().withMessage('Date cannot be empty'),

    ];

    await Promise.all(rules.map(rule=>rule.run(req)));

    var validationErrors=validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.render("update-job",{
            errorMessage:validationErrors.array()[0].msg
        })
    }

    next();
}

export default updatevalidateRequest;