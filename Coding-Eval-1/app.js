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

// get all jobs in a particular city which matches a particular skill
// find all the jobs that are available as Work from home. - 
// find all the jobs that will accept a notice period of 2 months.
// find all jobs by sorting the jobs as per their rating.
// an api to get details of the company. - done
// find the company that has the most open jobs.

app.get("/company/:company_name",async (req,res)=>{
    try{
        const company = await Company.find({company_name:req.params.company_name}).lean().exec();
        res.status(201).send(company);
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.get("/company/wfh", async (req, res) => {
    const company = await Company.find({job_type:"Work from home"});
    res.status(201).send(company)
}){

}

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
