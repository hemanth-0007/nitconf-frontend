import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const login = (jwtToken) => {
    setIsAuthenticated(true);
    setToken(jwtToken);
    // Save the user data to localStorage or a cookie for persistence
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    // Remove the user data from localStorage or cookie
    localStorage.removeItem('token');
  };

  // Check for existing user data on initial load
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
