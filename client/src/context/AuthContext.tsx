import React, { createContext, useContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    email: string | null;
    emailConfirmed: boolean;
    isAdmin?: boolean;
    login: (data: { token: string; email: string; emailConfirmed: boolean }) => void;
    logout: () => void;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    email: null,
    emailConfirmed: false,
    login: () => { },
    logout: () => { },
    refreshUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem("email"));
    const [emailConfirmed, setEmailConfirmed] = useState<boolean>(() => localStorage.getItem("emailConfirmed") === "true");
    const navigate = useNavigate();

    const adminEmail = "kifipi9327@dropeso.com";

    const login = ({ token, email, emailConfirmed }: { token: string; email: string; emailConfirmed: boolean }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("emailConfirmed", String(emailConfirmed));
        setToken(token);
        setEmail(email);
        setEmailConfirmed(emailConfirmed);
        window.dispatchEvent(new Event("profile-updated"));
    };

    const refreshUser = () => {
        setEmail(localStorage.getItem("email"));
        setEmailConfirmed(localStorage.getItem("emailConfirmed") === "true");
        window.dispatchEvent(new Event("profile-updated"));
    };

    const logout = () => {
        ["token", "email", "emailConfirmed", "cart", "userProfile"].forEach((k) =>
            localStorage.removeItem(k)
        );
        setToken(null);
        setEmail(null);
        setEmailConfirmed(false);
        window.dispatchEvent(new Event("profile-updated"));
        setTimeout(() => navigate("/home", { replace: true }), 200);
    };

    return (
        <AuthContext.Provider value={{ token, email, emailConfirmed, isAdmin: email === adminEmail, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
