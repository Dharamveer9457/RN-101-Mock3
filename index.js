const express = require('express');
const app = express();
const connection = require("./congif/connection");
require('dotenv').config()
const {UserRouter} = require("./routes/UserRoutes");
const {FlightRouter} = require("./routes/FlightRoutes");
const {BookingRouter}= require("./routes/bookingRoutes");

app.use(express.json())
app.use("/users", UserRouter)
app.use("/flights", FlightRouter)
app.use("/booking", BookingRouter)


app.listen(process.env.PORT, async()=>{
    await connection
    .then(()=>console.log(`Server is running at ${process.env.PORT}`))
    .catch(()=> console.log("Error in running the server"))
})