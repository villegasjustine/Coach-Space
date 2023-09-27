import DataGridUser from "../components/AdminUser";
import FormDialog from "../components/user/FormDialog";



export default function UserPage() {
    return (
      <div className="UserPage">
        user Page
        <br></br>
        <ul>
          <li>Display all users from data</li>
          <li>Only coach usertype can access</li>
          <li>Edit programs here</li>
          <li>Needs to be protected route</li>
        </ul>
      <DataGridUser></DataGridUser>
      <FormDialog></FormDialog>
      
      </div>
    );
  }
  