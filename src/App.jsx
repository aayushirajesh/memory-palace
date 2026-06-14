import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import PalaceLayout from './layouts/PalaceLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from "./pages/Login";
import Home from "./pages/Home";
import WriteMemory from "./pages/WriteMemory";
import MemoryWall from "./pages/MemoryWall";
import MemoryPage from "./pages/MemoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* General Palace Routes */}
      <Route element={<PalaceLayout />}>
        <Route path="/" element={<Home />} />
        
        {/* Secured routes behind the Protected Route gate */}
        <Route element={<ProtectedRoute  />}>
          <Route path="/memorywall" element={<MemoryWall />} />
          <Route path="/memory/:id" element={<MemoryPage />} />
          <Route path="/write" element={<WriteMemory />} />
        </Route>
      </Route>

      {/* Authentication Isolated Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Redirection */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
