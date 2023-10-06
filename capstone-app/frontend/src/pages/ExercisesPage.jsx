import UserExercisesHistory from "../components/UserExercisesHistory"
import UserExerciseDisplay from "../components/UsersExerciseDisplay"
import WeeklyExerciseDisplay from "../components/exercises/WeeklyExerciseDisplay"


export default function ExercisesPage() {
    return(
        <>
        <div className="AssignExercisePage">
        

        {/* <BoxDisplay></BoxDisplay> */}
       <WeeklyExerciseDisplay></WeeklyExerciseDisplay>
        <UserExercisesHistory/>
        <UserExerciseDisplay></UserExerciseDisplay>

        
        </div>
        </>
    )
}