// import React, {useEffect,useState} from 'react'
import React, {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
//useEffect is used to fetch data from the backend and useState is used to store the data in the state and display it on the frontend
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { API_URL } from '../config';


const Home = () => {

  // onst [workouts,setWorkout]=useState(null)c

  const {workouts, dispatch} = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response=await fetch(API_URL + '/api/workouts')
      const json=await response.json()
      if(response.ok){
        // setWorkout(json)
        dispatch({type:'SET_WORKOUTS', payload: json})
      }
    }
    fetchWorkouts()
  },[dispatch])


  return (
    <div className='home'>
      <div className='workouts'>
        {
          workouts && workouts.map((workout)=>(
            // <p key={workout._id}>{workout.title}</p>
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        }
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
