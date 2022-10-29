import React from 'react';
import { Link, Routes, Route } from "react-router-dom"

import Dashboard from './components/dash/Dashboard'
import NewUser from './components/new/NewUser'



function App() {

  


  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path='/new' element={<NewUser />} />

      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;


