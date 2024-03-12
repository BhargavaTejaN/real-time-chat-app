/* eslint-disable no-unused-vars */

import { Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

import { Home, Login, Signup } from "../pages/index";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Routers;
