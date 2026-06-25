import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { API_URL } from '../config'
import { useAuthContext } from '../hooks/useAuthContext'

//Data-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const WorkoutDetails = ({ workout }) => {

  const {user}=useAuthContext()


  const { dispatch } = useWorkoutsContext()
  const handleClick = async () => {

    if(!user){
      return
    }



    const response =await fetch(API_URL + '/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
    if(response.ok){
      // Do something, e.g., update the UI or show a success message
      dispatch({ type: 'DELETE_WORKOUT', payload: workout })
    }
  }


  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (in Kgs):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <span style={{ fontSize: '30px', color: 'red' }} className="material-symbols-outlined"onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
