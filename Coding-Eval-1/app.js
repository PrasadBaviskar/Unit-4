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
})

const Company =  mongoose.model("Company",companySchema)

app.get("/")

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
