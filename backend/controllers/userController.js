import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';

//api to register user

const registerUser = async (req, res) => {
    try {

        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
        
        }




        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Invalid email"});
        }

        if(password.length < 8 ){
            return res.status(400).json({success:false,message:"Password must be at least 8 characters long"});
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,
            email,
            password:hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.status(201).json({success:true,message:"User registered successfully",token});


        



        




        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

//api for user login
const loginUser= async(req,res) => {
    try {

        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.status(200).json({success:true,message:"User logged in successfully",token});
        } else {
            res.status(400).json({success:false,message:"Invalid credentials"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

//api to get user profile data

const getProfile = async(req,res) => {
    try {

        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password');

        res.status(200).json({success:true, userData});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// api to update user profile

const updateProfile = async(req,res) => {
    try {

        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender ){
            return res.status(400).json({success:false,message:"All fields are required"});

        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            // upload img to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId,{image:imageURL});
        }

        res.status(200).json({success:true,message:"Profile updated successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// API to book appointment
const bookAppointment = async (req,res) => {

    try {

        const {docId,slotDate,slotTime} = req.body;
        const userId = req.userId;

        const docData = await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.status(400).json({success:false,message:"Doctor is not available"});
        }

        let slots_booked = docData.slots_booked || {};

        // check slot availability

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.status(400).json({success:false,message:"Slot not available"});
            } else{
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;  // check if anything goes wrong

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            date:Date.now(),

            
            

        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.status(201).json({success:true,message:"Appointment booked successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
    
}


// api to get user appointments for frontend my-appointments page

const listAppointment = async (req,res) => {

    try {

        const userId = req.userId; // check this
        const appointments = await appointmentModel.find({userId});

        res.status(200).json({success:true,appointments});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }

}

// api to cancel appointment

const cancelAppointment = async (req,res) => {

    try {

        const {appointmentId} = req.body;
        const userId = req.userId;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify if appointment belongs to user

        if (appointmentData.userId != userId){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled : true});

        // releasing doctor slot

        const {docId,slotDate,slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.status(200).json({success:true,message:"Appointment cancelled successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// const razorpayInstance = new razorpay({
//     key_id: '',
//     key_secret: '',
// });

//api to make payment using razorpay

// const paymentRazorPay = async (req,res) => {

// }





export {registerUser,loginUser, getProfile , updateProfile , bookAppointment , listAppointment , cancelAppointment};
