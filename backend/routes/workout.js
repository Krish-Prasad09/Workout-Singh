const express=require('express')
const Workout=require('../models/workoutModel')
const { createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout } = require('../controllers/workoutController')

const router=express.Router()

// GET all workouts
router.get('/',getWorkouts
//     (req,res)=>{
//     res.send({msg: 'Get all workouts'})
// }
)


router.get('/:id',getWorkout
//     (req,res)=>{
//     res.json({msg: `Get workout with id ${req.params.id}`})
// }
)


router.post('/', createWorkout
//     async(req,res)=>{
//     const {title,reps,load}=req.body;


//     try{
//         const workout=await Workout.create({title,reps,load}) //for database things it is good to put async await so that it waits for the database to respond before moving on to the next line of code
//         res.status(200).json(workout)
//     }catch(err){
//         res.status(400).json({error: err.message})
//     }


//     res.json({msg: 'Create a new workout'})
// }
)

router.delete('/:id',deleteWorkout
//     (req,res)=>{
//     res.json({msg: `Delete workout with id ${req.params.id}`})
// }
)

router.patch('/:id',updateWorkout
//     (req,res)=>{
//     res.json({msg: `Update workout with id ${req.params.id}`})
// }
)


module.exports=router