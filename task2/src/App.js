import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Home } from "./pages/home/Home";
import { DetailsPages } from "./pages/details/DetailsPages";
import { EditBlog } from "./components/blog/EditBlog";
import { BlogForm } from "./components/blog/BlogForm";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/login/Register";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Updated path to '/' */}
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<BlogForm />} />
        <Route path="/details/:id" element={<DetailsPages />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
