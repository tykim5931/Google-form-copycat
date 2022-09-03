import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import {EditPage, Preview, ResultPage} from './pages'

function App() {
  return(
    <div className='App'>
      <nav>
        <Link to='/'>편집</Link> |{" "}
        <Link to='/preview'>미리보기</Link> |{" "}
        <Link to='/result'>완료</Link>
      </nav>
      <Routes>
        <Route path='/' element={<EditPage />} />
        <Route path='/preview' element={<Preview />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
