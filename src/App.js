import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/index/index';
import Register from './pages/register/index';
import Login from './pages/login/index';
import ForgotPassword from "./pages/forgotPassword/forgotPassword.js";
import './App.css';
import CheckOut from "./pages/checkout/checkout";


function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
