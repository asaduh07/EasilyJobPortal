import nodemailer from 'nodemailer';
export default async function sendmail(email){
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'codingninjas2k16@gmail.com',
            pass:'slwvvlczduktvhdj'
        },
    })
    const mailoptions={
        from:'codingninjas2k16@gmail.com',
        to:email,
        subject: 'Application Confirmation',
        text:'Dear Applicant,Thank you for applying, we will connect with you soon.'
    }
    try{
        const result=await transporter.sendMail(mailoptions);
        console.log("Success: Email sent to ", email);
    }catch(err){
        console.log(err);
    }

};