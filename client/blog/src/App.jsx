import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Home from './Home/Home.jsx';
import Register from './Register/Register.jsx';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  }

  return (
    <Router>
      <Routes>
        
        {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}

  
        {isAuthenticated && <Route path="/" element={<Navigate to="/posts" />} />} 

       
        <Route
          path="/posts"
          element={ isAuthenticated ?  <Home /> : <Navigate to="/login" /> }
        />
     
       
        <Route
           path="/login"
          element={!isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Navigate to="/posts" />}
        /> 
 
        <Route
          path="/register"
          element={!isAuthenticated ? <Register {...props} setAuth={setAuth}  /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
