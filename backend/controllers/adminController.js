import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";



//api for adding doctor

const addDoctor = async (req, res) => {
    try {

        const {name, email, password, speciality, degree, experience, about, available, fees, address} = req.body;
        const imageFile = req.file;    

        // console.log({name, email, password, speciality, degree, experience, about, available, fees, address},imageFile);

        //checking if all fields are present

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({success:false,message: 'All fields are required'});
        }

        // validating email format

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message: 'Invalid email format'});
        }

        // validating strong password

        if(password.length<8) {
            return res.status(400).json({success:false,message: 'Password must be at least 8 characters long'});
        }

        // hashing password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //uploading image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        // creating new doctor object

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            // available: available === 'true',
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            // slots_booked: {}
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({success:true,message: 'Doctor added successfully'});

    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// api for admin login

const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        //checking if all fields are present

        if (!email || !password) {
            return res.status(400).json({success:false,message: 'All fields are required'});
        }

        // validating email format

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message: 'Invalid email format'});
        }

        // checking if admin exists

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            // generating jwt token
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.status(200).json({success:true,message: 'Admin logged in successfully', token});
        }
        else {
            res.json({success:false,message: 'Invalid admin credentials'});
        }
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// Api to get all docs for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.status(200).json({success:true,doctors});

        
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

const checkAvailability = async (req,res) => {

    try {

        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
        res.status(200).json({success:true,message:'Doctor availability updated successfully'});


        
    } catch (error) {

        console.error('Error checking availability:', error);
        res.status(500).json({success:false,message:error.message});
        
    }

   




}

export {addDoctor, loginAdmin, allDoctors,checkAvailability};