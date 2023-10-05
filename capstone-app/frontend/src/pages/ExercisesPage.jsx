import UserExercisesHistory from "../components/UserExercisesHistory"
import ExerciseGroupDisplay from "../components/exercises/ExerciseGroupDisplay"


export default function ExercisesPage() {
    return(
        <>
        <div className="ExercisesPage">
        

        {/* <BoxDisplay></BoxDisplay> */}
        <ExerciseGroupDisplay />
        <UserExercisesHistory/>

        
        </div>
        </>
    )
}