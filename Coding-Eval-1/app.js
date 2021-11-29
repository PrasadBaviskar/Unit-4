const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const companySchema = new mongoose.Schema({
    company_name:{type:String},
    req_skill:{type:String},
    job_location:{type:String},
    notice_period:{type:Number},
    rating:{type:Number},
    job_type:{type:String},
    vacancy:{type:Number},
},{
    versionKey:false,
    timestamps:true
})

const Company =  mongoose.model("Company",companySchema)







// an api to get details of the company

app.get("/company/:company_name",async (req,res)=>{
    try{
        const company = await Company.find({company_name:req.params.company_name}).lean().exec();
        res.status(201).send(company);
    }
    catch(err){
        res.status(400).send(err);
    }
});


// get all jobs in a particular city which matches a particular skill

app.get("/company/:job_location/:req_skill",async (req,res)=>{
    try{
        const company = await Company.find({job_location:req.params.job_location, req_skill:req.params.req_skill}).lean().exec();
        res.status(201).send(company);
    }
    catch(err){
        res.status(400).send(err);
    }
});


// find all the jobs that are available as Work from home.

app.get("/wfh", async (req, res) => {
    try{
        const company = await Company.find({job_type: {$eq:"Work from home"}});
        
        res.status(201).send(company)
    }catch(err){
        res.status(400).send(err);
    } 
});

// find all the jobs that will accept a notice period of 2 months

app.get("/np",async (req, res) => {
    try{
        const company = await Company.find({notice_period: {$eq:2}}).lean().exec();
        res.status(400).send(company)
    }catch(err){
        res.status(400).send(err);
    }
})

// find all jobs by sorting the jobs as per their rating.

app.get("/rating", async (req, res) => {
    try{
        const company = await Company.find().sort({rating:1}).lean().exec();
        res.status(400).send(company)
    }catch(err){
        res.status(400).send(err);
    }
});


// find the company that has the most open jobs.

app.get("/most_vaccancy", async (req, res) => {
    try{
        const company = await Company.find().sort({vacancy:-1}).limit(1);
        res.status(400).send(company)
    }catch(err){
        res.status(400).send(err);
    }
})


const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/company");
}

const start = async ()=>{
    await connect();
    app.listen(5000,()=>{
        console.log("Listning port 5000.");
    });
}

start();
