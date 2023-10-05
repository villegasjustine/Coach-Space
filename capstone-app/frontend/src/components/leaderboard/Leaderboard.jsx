import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import { useUserContext } from "../../context/UserContext";

export default function Leaderboard({ groupUsers }) {
  const { currentUser } = useUserContext();

  console.log(currentUser);

  console.log(groupUsers);

  return (
    <div>
      {groupUsers
        .filter((member) => member.role === "student")
        .map((student) => (
          <User
            key={student.id}
            avatar={student.avatar}
            name={student.firstName}
            points={student["SUM(CAE.totalPoints)"]}
          />
        ))}
    </div>
  );
}
