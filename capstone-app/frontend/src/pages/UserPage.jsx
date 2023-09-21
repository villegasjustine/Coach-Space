import DataGridDemo from "../components/DataGridDemo";

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

   <DataGridDemo></DataGridDemo>
      </div>
    );
  }
  