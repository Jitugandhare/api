const express = require('express')
const { DoctorModel } = require("../models/doctor.model")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
const doctorRouter = express.Router();


const {auth}=require("../middleware/auth.middleware")

doctorRouter.get("/", async (req, res) => {
    const specialization = req.query.specialization;
    const sortQuery = req.body.sort;
    const doctorname = req.body.name;

    try {
        let doctors
        const query = {}
        if (doctorname) {
            query.name = { $regex: doctorname, $options: "i" }
        }
        if (specialization) {
            query.specialization = specialization;
        }
        doctors = await DoctorModel.find(query)

        if (doctors.length === 0) {
            return res.status(400).json({ msg: "No doctors" })
        }

        if (sortQuery === "asc") {
            doctors = doctors.sort((a, b) => a.date - b.date)
        } else if (sortQuery === "desc") {
            doctors = doctors.sort((a, b) => b.date - a.date)

        }
        res.send(doctors)



    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});



doctorRouter.post("/appointments",async(req,res)=>{
    const {name,imageUrl,specialization,exprerience,location,date,slots,fee}=req.body;
    const newAppointments=new DoctorModel({
        name,imageUrl,specialization,exprerience,location,date,slots,fee
    })
    try{
        const appointment=await newAppointments.save()
        res.status(200).json({appointment})
    }catch(err){
        res.status(400).json({Error:err.message})
    }
});

doctorRouter.patch("/edit/:id", async (req, res) => {
    const doctorID = req.params.id;
    const updateFields = req.body;
    try {
        await DoctorModel.findByIdAndUpdate({ _id: doctorID }, updateFields);
        res.status(200).json({ Msg: "updated" });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});
doctorRouter.delete("/delete/:id",async(req,res)=>{
    
    try{
        const docotrID=req.params.id
        await DoctorModel.findByIdAndDelete({_id:docotrID})
        res.send("Deleted")

    }catch(err){
        res.status(400).send({ Error: err.message });
    }
});



module.exports = {
    doctorRouter
}