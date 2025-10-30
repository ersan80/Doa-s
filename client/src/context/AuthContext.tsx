import React, { createContext, useContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    email: string | null;
    emailConfirmed: boolean;
    isAdmin?: boolean;
    login: (data: { token: string; email: string; emailConfirmed: boolean }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    email: null,
    emailConfirmed: false,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem("email"));
    const [emailConfirmed, setEmailConfirmed] = useState<boolean>(() => {
        const stored = localStorage.getItem("emailConfirmed");
        return stored === "true";
    });

    const navigate = useNavigate();
    const adminEmail = "kifipi9327@dropeso.com";

    const login = ({
        token,
        email,
        emailConfirmed,
    }: {
        token: string;
        email: string;
        emailConfirmed: boolean;
    }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("emailConfirmed", String(emailConfirmed));
        setToken(token);
        setEmail(email);
        setEmailConfirmed(emailConfirmed);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("emailConfirmed");

        setToken(null);
        setEmail(null);
        setEmailConfirmed(false);
        setTimeout(() => {
            navigate("/home");
        }, 100);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                email,
                emailConfirmed,
                isAdmin: email === adminEmail,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

