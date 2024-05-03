import React, {useEffect} from 'react';
import './pages/LoadingPage/ui/title.scss';
import MainPage from "./pages/MainPage/ui/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MoviePage from "./pages/MoviePage/ui/MoviePage";
function App() {

  return (
    <div className='w-full h-full'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/movie/:title" element={<MoviePage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;


/*
  useEffect(()=>{
    const filmName = 'Bad Boys (1995)'; // Example film name

    fetch('http://localhost:8000/recommend/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ film_name: filmName }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Recommended Films:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

  }, [])

 */