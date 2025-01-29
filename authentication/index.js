const express=require('express');
const app=express();
const dotenv=require('dotenv');
const  connection = require('./configue/db.js');
dotenv.config();


app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log(`DB connected`);
        console.log(`app is runnig on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})