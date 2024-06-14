import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState({
        userId: '',
        username: ''
    });

    const updateState = (key, value) => {
        setUserState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    return (
        <UserContext.Provider value={{ userState, updateState }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy access to context
export const useUser = () => useContext(UserContext);
