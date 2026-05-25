import { createContext, useState, useContext, ReactNode } from 'react';

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string; 
}

interface AuthContextType {
    user: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    const login = (userData: UserData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth harus digunakan di dalam AuthProvider");
    return context;
};