import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token && !user) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, [token, user]);

  const login = (tokenData) => {
    setToken(tokenData.access_token);
    localStorage.setItem('token', tokenData.access_token);

    const userData = {
      email: tokenData.email,
      name: tokenData.name,
      createdOn: new Date(tokenData.created_at).toDateString()
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
