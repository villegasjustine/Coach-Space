import { Button } from "@mui/material";
import AssignExercise from "../components/AssignExercise";
import ExerciseUserGrid from "../components/ExerciseUserGrid";
import TestExerciseAssign from "../components/Test/TestExerciseAssign";
import IconChipsTest from "../components/IconChipsTest";




export default function AdminExercisePage() {

    return(
        <>
        <div className="AdminExercisePage">
        Assign Exercise Page
        <br/>

        <li>Only coaches and admin can access</li>
        <li>Assign exercises for students</li>
        <li>See a list of students under the coach's name : this would be a bonus</li>
        <li>Should be able to bulk assign to specific students through a tickbox</li>

        <AssignExercise></AssignExercise>
        <TestExerciseAssign></TestExerciseAssign>
        
        
        
      <Button>Assign Exercises</Button>
      
        </div>
        </>
    )
}