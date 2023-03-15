import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutComponent from "./components/layout/layout";
import Hostel from "./components/screen/hostel";
import Degree from "./components/screen/degree/degree";
import Department from "./components/screen/department";
import Student from "./components/screen/student";
import Dashboard from "./components/screen/dashboard";
import AddStudent from "./components/screen/student/addStudent";
import "./App.css";
import './components/css/style.scss'
import "font-awesome/css/font-awesome.css"
import Login from "./components/screen/login";
import ProtectedRoute from "./components/components/protectedRoute";
import auth from "./components/services/authService";
import { useEffect, useState } from "react";
import NotFound from "./components/screen/404";

const token = auth.getAuthToken();

// axios.defaults.baseURL = `http://localhost:8000/apiV1/`;
axios.defaults.baseURL = `https://novaxylo.pythonanywhere.com/apiV1/`;
axios.defaults.headers.common.Authorization = `JWT ${token}`


function App() {
  const [user, setUser] = useState();
  const handleUser = async () => {
    const user = await auth.getCurrentUser();
    setUser(user)
  }
  useEffect(() => {
    if (token) {
      handleUser()
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={
            <LayoutComponent>
              <Dashboard />
            </LayoutComponent>
          } />
          <Route exact path="/department" element={
            <LayoutComponent>
              <Department />
            </LayoutComponent>
          } />
          <Route exact path="/degree" element={
            <LayoutComponent>
              <Degree />
            </LayoutComponent>
          } />
          <Route exact path="/hostel" element={
            <LayoutComponent>
              <Hostel />
            </LayoutComponent>
          } />
          <Route exact path="/student" element={
            <LayoutComponent>
              <Student />
            </LayoutComponent>
          } />
          <Route exact path="/addStudent" element={
            <LayoutComponent>
              <AddStudent />
            </LayoutComponent>
          } />
          <Route exact path="/addStudent/:studentId" element={
            <LayoutComponent>
              <AddStudent />
            </LayoutComponent>
          } />
        </Route>
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </Router >
  );
}

export default App;
