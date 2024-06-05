import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import userCalls from "../api/UserCalls";

const UserContext = createContext();
const UpdateUserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const useUpdateUser = () => {
    return useContext(UpdateUserContext);
};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const parsedToken = jwtDecode(token);
            if(parsedToken && parsedToken.userId){
                userCalls.getAppUser(parsedToken.userId)
                .then(res => setUser(res))
            }
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            <UpdateUserContext.Provider value={setUser}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    );
}