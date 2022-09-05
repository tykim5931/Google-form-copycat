import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import {EditPage, Preview, ResultPage} from './pages'

function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={<EditPage />} />
        <Route path='/preview' element={<Preview />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
