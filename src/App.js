import React from 'react';
import {  Routes, Route} from "react-router-dom"

import Dashboard from './components/dash/Dashboard'
import NewUser from './components/new/NewUser'
import Edit from './components/edit/Edit'



function App() {

  

  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}>
        <Route exact path="new" element={<NewUser />} />
        <Route exact path="edit/:userId" element={<Edit />} />
      </Route>

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


