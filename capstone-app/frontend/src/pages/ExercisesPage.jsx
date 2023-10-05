import UserExercisesHistory from "../components/UserExercisesHistory"
import UserExerciseDisplay from "../components/UsersExerciseDisplay"
import ExerciseGroupDisplay from "../components/leaderboard/ExerciseGroupDisplay"


export default function ExercisesPage() {
    return(
        <>
        <div className="ExercisesPage">
        

        {/* <BoxDisplay></BoxDisplay> */}
        <ExerciseGroupDisplay />
        <UserExercisesHistory/>
        <UserExerciseDisplay></UserExerciseDisplay>

        
        </div>
        </>
    )
}