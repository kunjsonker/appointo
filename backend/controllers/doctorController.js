// import doctorModel from "../models/doctorModel";

import doctorModel from "../models/doctorModel.js"


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

export {doctorList};








