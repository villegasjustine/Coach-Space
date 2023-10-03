import AdminUserGrid from "../components/AdminUserGrid";
import EnhancedTable from "../components/Test/UserTable";
import EditUserDialog from "../components/user/EditUserDialog";

import FormDialog from "../components/user/FormDialog";



export default function UserPage() {
    return (
      <div className="UserPage">
        User Page
        
     <AdminUserGrid/>
      <FormDialog></FormDialog>
      <EditUserDialog></EditUserDialog>
     <EnhancedTable></EnhancedTable>
    
      </div>
    );
  }
  