const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const cors=require('cors')

const workoutRoutes=require('./routes/workout')
const userRoutes=require('./routes/user')

dotenv.config() // Load environment variables from .env file
const app=express() //method to create an express application

app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(express.json()) // Middleware to parse JSON bodies of incoming requests 
app.use((req,res,next)=>{ //GET,POST,PUT,DELETE
    console.log(req.path,req.method)
    next()
})


app.get('/',(req,res)=>{
    res.json({msg: 'Hello World'})
})


app.use('/api/workouts',workoutRoutes) // Use the workout routes for any requests to /api/workouts
app.use('/api/users',userRoutes) // Use the user routes for any requests to /api/users

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB')})
    .catch((error)=>{
        console.error('Error connecting to MongoDB:', error)
    }) 


const PORT=process.env.PORT;



app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT} & db done`);
})