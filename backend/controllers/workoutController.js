const Workout=require('../models/workoutModel');
const mongoose=require('mongoose')

// get all workouts
exports.getWorkouts=async(req,res)=>{
    const workouts=await Workout.find({/*reps:15 */}).sort({createdAt:-1}) //sort by createdAt in descending order  
    if(!workouts){
        return res.status(404).json({error: 'No workouts found'})
    }
    res.status(200).json(workouts)
}

//get a single workout by its id
exports.getWorkout=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid workout id'})
    } 
    const workout=await Workout.findById(id); // or you can use Workout.find(_id:id)

    

    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}

//create a new workout
exports.createWorkout = async (req, res) => {
    const {title,load,reps}=req.body;

    let emptyFields=[];
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        const workout=await Workout.create({title,reps,load}) //for database things it is good to put async await so that it waits for the database to respond before moving on to the next line of code
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({error: err.message})
    }

}

exports.deleteWorkout=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid workout id'})
    }
    const workout=await Workout.findByIdAndDelete(id) // or you can use Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}

exports.updateWorkout=async(req,res)=>{
    const {id}=req.params;  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid workout id'})
    }
    const workout=await Workout.findByIdAndUpdate(id, {...req.body}, {new: true})
    if(!workout){//parameter, data to choose, to update and return the new updated document
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}