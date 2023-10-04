import { Button } from "@mui/material";
import AssignExercise from "../components/AssignExercise";
import ExerciseUserGrid from "../components/ExerciseUserGrid";
import TestExerciseAssign from "../components/Test/TestExerciseAssign";
import IconChipsTest from "../components/IconChipsTest";
import UserExerciseDisplay from "../components/UsersExerciseDisplay";
import AdminExerciseGrid from "../components/AdminExerciseGrid";




export default function AdminExercisePage() {

    return(
        <>
        <div className="AdminExercisePage">
        Admin Exercise Page
        <br/>

  
       <AdminExerciseGrid/>
       

        
        </div>
        </>
    )
}