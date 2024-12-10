import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Teacher from './Teacher';
import Student from './Student';
import StudentLayout from './layout/StudentLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/c/:roomId' element={<Teacher />} />
          <Route path='/j/:roomId' element={<Student />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
