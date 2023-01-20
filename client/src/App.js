import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu"
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/user/dashboard"

function App() {
  return (
   <BrowserRouter>
   <Menu></Menu>
   {/* needed for toast notification to work on below routes */}
   <Toaster/>      
     <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/register' element = {<Register />} />
      <Route path="/dashboard" element={<Dashboard/>} />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
