const mongoose=require('mongoose');

const appointmentSchema =  mongoose.Schema({
    name: String,
    imageURL: String,
    specialization: String,
    experience: Number,
    location: String,
    date: Date,
    slots: Number,
    fee: Number,
  });

  const DoctorModel=mongoose.model("doctor",appointmentSchema)

  module.exports={
    DoctorModel
  }