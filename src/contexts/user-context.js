import { createContext, useState, useEffect } from "react";

import { authStateChangeListener, createUserDocumentFromAuth } from "../utilities/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    useEffect(() => {
        const unsubscribe = authStateChangeListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscribe;
        // unsubscribe is a function that firebase onauthstatechange returns which helps us stop the listener whenever the component unmounts.
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}