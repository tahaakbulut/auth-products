import React, { useContext } from 'react';
import useLocalStorage from '../hooks/use-local-storage';
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', '');
  const [userId, setUserId] = useLocalStorage('userId', '');

  const login = (data) => {
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUserId(json.id);
        setToken(`Bearer ${json.access_token}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logout = () => {
    setToken('');
  };

  return <AuthContext.Provider value={{ userId, token, login, logout }}>{children}</AuthContext.Provider>;
};
