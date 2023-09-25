import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';
import { useUserContext } from '../context/UserContext';

export default function Leaderboard() {
  const {currentUser} = useUserContext();
  const [groupUsers, setGroupUsers] = useState([]);
  console.log(currentUser)
  
console.log(groupUsers)
  useEffect(() => {
  console.log(currentUser.group)
    if (currentUser.group) {
      const apiUrl = `http://localhost:8080/api/users/groups/${currentUser.group}`;
      

      axios
        .get(apiUrl)
        .then((response) => {
          const fetchedUsers = response.data.data;
          setGroupUsers(fetchedUsers);
          console.log(fetchedUsers)
        })
        .catch((error) => {
          console.error('Error fetching group members:', error);
        });
    }
  }, []); 

  return (
    <div>
      {groupUsers.length >  0 ? 
        groupUsers.map((member) => (
            <User
            key={member.id}
            avatar={member.avatar}
            name={member.firstName}
          />
        ))
       : 
        <p>Test Test</p>
      }
    </div>
  );
}
