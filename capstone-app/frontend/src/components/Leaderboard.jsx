import User from "./User"

{/* <li>Need to use User Context</li>
        <li>Do I need to make a Group Context? Nope. Just add the
            user group in UserContext.
        </li>
        <li>Create a logic - grabs the group the active user is in.</li>
        <li>Populates / Maps through the userdatabase with the === group</li> */}

export default function Leaderboard() {
    return props.users.map((user) => {
        if (user.role == "student")
        {
            return <User 
            key={user.id} 
            avatar={user.avatar}
            name={user.name} 
            points={user.points}/>
        }
})
    
}