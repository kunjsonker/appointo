// import doctorModel from "../models/doctorModel";

import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

// const checkAvailability = async (req,res) => {

//     try {

//         const {docId} = req.body;

//         const docData = await doctorModel.findById(docId);
//         await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
//         res.status(200).json({success:true,message:'Doctor availability updated successfully'});


        
//     } catch (error) {

//         console.error('Error checking availability:', error);
//         res.status(500).json({success:false,message:error.message});
        
//     }

   




// }

// export {checkAvailability};

const doctorList = async (req, res) => {
    try {
        console.log("Fetching doctors list...");
        const doctors = await doctorModel.find({}).select(['-password','-email']);
        res.status(200).json({success:true,doctors});
        
    } catch (error) {
        console.error('Error fetching doctors list:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// api for doctor login

const loginDoctor = async (req, res) => {
    try {

        const {email,password} = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.status(200).json({success:false,message:'Doctor not found'});
        }

        const isMatch = await bcrypt.compare(password,doctor.password);
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
            res.status(200).json({success:true,message:'Doctor logged in successfully',token});
        } else {
            res.status(200).json({success:false,message:'Invalid credentials'});
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
        
    }
}

// api to get doctor app for doc panel

const appointmentsDoctor = async (req,res) => {
    try {

        const docId = req.docId;
        const appointments = await appointmentModel.find({docId})

        res.status(200).json({success:true,appointments});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
        
    }
}

//api to mark appointment as completed by doctor

const appointmentComplete = async (req,res) => {
    try {

        const docId = req.docId;
        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.status(200).json({success:true,message:'Appointment marked as completed'});


        }

        else {
            return res.status(200).json({success:false,message:'Appointment not found or unauthorized'});
        }



        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
        
    }
}


//api to cancel appointment by doctor

const appointmentCancel = async (req,res) => {
    try {

        const docId = req.docId;
        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.status(200).json({success:true,message:'Appointment marked as completed'});


        }

        else {
            return res.status(200).json({success:false,message:'cancellation failed or unauthorized'});
        }



        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
        
    }
}

//api to get dashboard data for doctor panel

const doctorDashboard = async (req,res) => {
    try {
        const docId = req.docId;

        const appointments = await appointmentModel.find({docId});

        let earnings = 0;

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }

            
            

        })

        let patients = [];

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointment: appointments.reverse().slice(0,5)
        }

        res.status(200).json({success:true,dashData});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
        
    }
}

// api to get doctor profile

const doctorProfile = async (req,res) => {
    try {
        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select(['-password']);

        res.status(200).json({success:true,profileData});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});
        
    }
}

//api to update doctor profile

const updateDoctorProfile = async (req,res) => {
    try {

        const docId = req.docId;
        const {fees , address , available} = req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available});

        res.status(200).json({success:true,message:'Profile updated successfully'});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message});

        
    }
}


export {doctorList,loginDoctor , appointmentsDoctor , appointmentComplete , appointmentCancel , doctorDashboard , doctorProfile , updateDoctorProfile}; ;








