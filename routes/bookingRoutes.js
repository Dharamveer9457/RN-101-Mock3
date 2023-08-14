const express = require("express");
const BookingRouter = express.Router();
const {auth} = require("../middleware/auth");
const BookingModel = require("../models/BookingModel");

// ------------Add booking---------------
BookingRouter.post("/api/booking",auth, async(req,res)=>{
    try {
        const {flightId} = req.body;
        const booking = new BookingModel({user:req.user, flight:flightId})
        booking.save();
        res.status(201).json({"message":"Booking Successfull"})
    } catch (error) {
        console.log(error);
        res.status(501).json({"Error":"Error while making a new booking"})
    }
})

// ------------Get all Booking----------------
BookingRouter.get("/api/dashboard",auth, async(req,res)=>{
    try {
        const bookings = BookingModel.find()
        res.status(200).json({bookings})
    } catch (error) {
        console.log(error);
        res.status(501).json({"Error":"Error while getting booking data"})
    }
})

// ------------Update Boooking's Data-------------------
BookingRouter.put("/api/dashboard/:id",auth, async(req,res)=>{
    try {
        const Booking = await BookingModel.findByIdAndUpdate(req.params.id, req.body);
        if(!Booking) return res.status(404).json({"message":"Booking not found"})
        res.status(204).json({"message":"Booking's data updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(501).json({"Error":"Error in updating Booking's data"})
    }
})

// ------------Delete Boooking's Data-------------------
BookingRouter.put("/api/dashboard/:id",auth, async(req,res)=>{
    try {
        const Booking = await BookingModel.findByIdAndDelete(req.params.id);
        if(!Booking) return res.status(404).json({"message":"Booking not found"})
        res.status(202).json({"message":"Booking's data deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(501).json({"Error":"Error in deleting Booking's data"})
    }
})


module.exports = {BookingRouter}