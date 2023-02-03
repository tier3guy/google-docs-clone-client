import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState("");
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user: currentUser, signup }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;