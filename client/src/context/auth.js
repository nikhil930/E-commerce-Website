import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(); // context is used so that name and address jo ki hum locally
// access kar rahe the in login and register wo globally sab access kar paayein , The <App/> will be
// wrapped with <AuthProvider> so that whatever state in context we use we can acces that everywhere
// and everything inside <AuthProvider> is recived as children to the function AuthProvider
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ ...auth, user: parsed.user, token: parsed.token });
    } 
  },[]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children};
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
// const [auth  ,setAuth] = useAuth();

export { useAuth, AuthProvider };
