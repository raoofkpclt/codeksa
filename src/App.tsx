import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicHome from "./pages/user/Home";
import About from "./pages/user/About";
import WhatWeSolve from "./pages/user/WhatWeSolve";
import Works from "./pages/user/Works";
import Service from "./pages/user/Service";
import Client from "./pages/user/Client";
import Contact from "./pages/user/Contact";
import PublicClientWorks from "./pages/user/ClientWorks";
import Industries from "./pages/user/Industries";


// =========================================
// Admin
// =========================================

import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProtectedRoute from "./routes/AdminProtectRoute";
import AdminPublicRoute from "./routes/AdminPublicRoute";
import AdminHome from "./pages/admin/Home";
import ClientManagement from "./pages/admin/ClientManagement";
import WorkManagement from "./pages/admin/WorkManagement";
import AdminClientUploads from "./pages/admin/ClientUploads"

// =========================================
// Client
// =========================================

import ClientLogin from "./pages/client/Login";
import ClientProtectedRoute from "./routes/ClientProtectRoute";
import Register from "./pages/client/Register";
import Onboarding from "./pages/client/Onboarding";
import ClientLayout from "./pages/client/ClientLayout";
import ClientHome from "./pages/client/Home";
import ClientProfile from "./pages/client/Profile";
import ClientWorks from "./pages/client/Works";
import ClientUploads from "./pages/client/ClientUploads";
import HowWeWork from "./pages/user/HowWeWork";
import Engagement from "./pages/user/Engagement";


// =========================================
// App
// =========================================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================
            Public
        ================================== */}

        <Route path="/" element={<PublicHome />} />
        <Route path="/what-we-solve" element={<WhatWeSolve />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/engagements" element={<Engagement/>} />
        <Route path="/industries" element={<Industries/>} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/works" element={<Works />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clientWorks/:clientId" element={<PublicClientWorks />} />
        

        {/* =================================
            Client Public Routes
        ================================== */}

        <Route path="/client/login" element={<ClientLogin />} />

        <Route path="/client/register" element={<Register />} />

        <Route path="/client/onboarding" element={<Onboarding />} />

        {/* =================================
            Client Protected Routes
        ================================== */}

        <Route
          path="/client"
          element={
            <ClientProtectedRoute>
              <ClientLayout />
            </ClientProtectedRoute>
          }
        >
          {/* /client → /client/home */}

          <Route index element={<Navigate to="/client/home" replace />} />

          {/* /client/home */}

          <Route path="home" element={<ClientHome />} />

          {/* /client/works */}

          <Route path="works" element={<ClientWorks />} />
          <Route path="clientUploads" element={<ClientUploads  />} />

          {/* /client/profile */}

          <Route path="profile" element={<ClientProfile />} />
        </Route>

        {/* =================================
            Admin Public Route
        ================================== */}

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />

        {/* =================================
            Admin Protected Routes
        ================================== */}

        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin/home" element={<AdminHome />} />

          <Route path="/admin/clients" element={<ClientManagement />} />

          <Route path="/admin/work" element={<WorkManagement />} />
          <Route path="/admin/clientUploads" element={<AdminClientUploads />} />
        </Route>

        {/* =================================
            Optional 404 Redirect
        ================================== */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
