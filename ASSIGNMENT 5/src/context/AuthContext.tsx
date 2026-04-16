import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  token: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Rehydrate state on load
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('userName');
    
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      if (savedUser) setUserName(savedUser);
    }
  }, []);

  const login = (newToken: string, name: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', name);
    setToken(newToken);
    setIsLoggedIn(true);
    setUserName(name);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setToken(null);
    setIsLoggedIn(false);
    setUserName(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
