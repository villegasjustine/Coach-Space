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
          console.log('Fetched Users',fetchedUsers)
        })
        .catch((error) => {
          console.error('Error fetching group members:', error);
        });
    }
  }, []); 

  
  return (
    <div>
      {/* {groupUsers.length > 0 ?  */}
       { groupUsers.map((member) => {
          console.log('member points', member['SUM(CAE.totalPoints)'])
            return <User
            key={member.id}
            avatar={member.avatar}
            name={member.firstName}
            points={member['SUM(CAE.totalPoints)']}
          />
      })
    //    : 
    //    <User
    //    key={currentUser.id}
    //    avatar={currentUser.avatar}
    //    name={currentUser.firstName}
    //    points={currentUser['SUM(CAE.totalPoints)']}
    //  />
      }
    </div>
  );
}
