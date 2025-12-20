import express from "express";
import { addDoctor , allDoctors, loginAdmin , appointmentsAdmin, appointmentCancel,adminDashboard } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
// import { checkAvailability } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin , upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
// adminRouter.post('/check-availabilty',authAdmin,checkAvailability);
adminRouter.get('/appointments',authAdmin,appointmentsAdmin);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashboard);


export default adminRouter;
