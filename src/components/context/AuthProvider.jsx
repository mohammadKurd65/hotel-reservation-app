import { createContext, useReducer } from "react";


const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenicated: false,
}

function authReducer(state, action){
    switch (action.type) {
        case "loging": return {
            user: action.payload,
            isAuthenicated: true,
        }
        case "logout": return {
            user: null,
            isAuthenicated: false,
        }
        default:
            throw new Error("Unknown action");
            
    }

}

const FAKE_USER = {
    name: "mohammad",
    email: "hsemohamad385@gmail.com",
    password: "1234",

}

export default function AuthContextProvider({children}){
    const [{user, isAuthenicated}, dispatch] = useReducer(authReducer, initialState);

    function login(email, password){
if(email === FAKE_USER.email && password === FAKE_USER.password) 
    dispatch({type: "login", payload: FAKE_USER})
    }

    function logout(){
    dispatch({type: "logout"})
    }
    return (
        <AuthContext.Provider 
        value={{
            user, 
            isAuthenicated, 
            login, 
            logout
        }}
        >
            {children}
            </AuthContext.Provider>
    )
}