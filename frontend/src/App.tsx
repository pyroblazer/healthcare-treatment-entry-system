import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import CreateTreatment from './pages/CreateTreatment';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Provider } from "./components/ui/provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Provider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-treatment" element={<CreateTreatment />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
