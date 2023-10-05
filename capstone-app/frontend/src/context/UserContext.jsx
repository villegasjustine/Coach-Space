import React, { useState, useContext } from "react";
import { useCookies } from 'react-cookie' 


const UserContext = React.createContext();

export const UserProvider = (props) => {

    
    const [cookies, setCookie, removeCookie] = useCookies(['user']); 
    console.log(cookies);

    // store the current user in state at the top level
    const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {}); // default user object, read from cookies if possible

    // sets user object in state, shared via context
    const handleUpdateUser = (user) => {
        if (user.token) 
        //choose which token you want - groupID, userID, coachID.
    {
            setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 }) // cookie will expire in 24 hours
           
        } else {
            removeCookie('user')
        }        
        setCurrentUser(user);
    };

    // 2. Provide the context.
    // The Provider component of any context (UserContext.Provider)
    // sends data via its value prop to all children at every level.
    // We are sending both the current user and an update function
    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
