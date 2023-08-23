import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/index/index';
import Register from './pages/register/index';
import Login from './pages/login/index';
import './App.css';
import Profile from "./pages/profile";

function App() {
  return (
    <div className="App">
        <header className="App-main">
        </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
