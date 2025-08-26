import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'

dotenv.config();
const app=express();
app.use(bodyparser.json());
const port=process.env.PORT;


//==========================================



//==========================================

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})