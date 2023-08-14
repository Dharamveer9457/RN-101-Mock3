const express = require("express");
const FlightRouter = express.Router();
const FlightModel = require("../models/FlightModel");

// -----------Get All Flights---------------
FlightRouter.get("/api/flights", async(req,res)=>{
    try {
        const flights = await FlightModel.find()
        res.status(200).json({flights})
    } catch (error) {
        console.log(error)
        res.status(501).json({"Error":"Error in getting flights data"})
    }
})

// -----------Get flight by id ----------------
FlightRouter.get("/api/flights/:id", async(req,res)=>{
    try {
        const flight = await FlightModel.findById(req.params.id);
        if(!flight) return res.status(404).json({"message":"Flight not found!"})
        res.status(200).json(flight)
    } catch (error) {
        console.log(error);
        res.status(501).json({"Error":"Error in getting Flight by ID"})
    }
})

// -----------Add new flight------------------
FlightRouter.post("/api/flights", async(req,res)=>{
    try {
        const flight = new FlightModel(req.body)
        await flight.save()
        res.status(201).json({"message":"New Flight added"})
    } catch (error) {
        console.log(error)
        res.status(501).json({"Error":"Error in adding new Flight"})
    }
})

// ------------Update Flight's Data-------------------
FlightRouter.patch("/api/flights/:id", async(req,res)=>{
    try {
        const flight = await FlightModel.findByIdAndUpdate(req.params.id, req.body);
        if(!flight) return res.status(404).json({"message":"Flight not found"})
        res.status(204).json({"message":"Flight's data updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(501).json({"Error":"Error in updating Flight's data"})
    }
})

// ------------Delete Flight's Data-------------------
FlightRouter.delete("/api/flights/:id", async(req,res)=>{
    try {
        const flight = await FlightModel.findByIdAndDelete(req.params.id);
        if(!flight) return res.status(404).json({"message":"Flight not found"})
        res.status(202).json({"message":"Flight's data deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(501).json({"Error":"Error in updating Flight's data"})
    }
})


module.exports = {FlightRouter}