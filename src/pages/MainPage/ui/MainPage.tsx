import React, {useEffect, useState} from 'react';
import LoadingPage from '../../LoadingPage/ui/LoadingPage'
import Navbar from "../../../widgets/header/ui/Navbar";
import {MovieInterface} from "../../../entities/MovieCard/MovieInterface";
import MovieList from "../../../features/MovieList/MovieList";

const MainPage = () => {

    const [loading, setLoading] = useState(true);
    const [moviesList, setMovieList] = useState<MovieInterface[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/get-films/`)
            .then(response => response.json())
            .then(data => {
                const filmsArray = JSON.parse(data.random_films);
                const arr: MovieInterface[] = filmsArray.map((v: { id: number; title: string }) => ({
                    id: v.title,
                    title: v.title.slice(0, -6)
                }));
                setMovieList(arr);
            })
    }, []);

    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 2900)
    }, []);

    return (
        <div className="main-container h-screen overflow-hidden font-bebas">
            {loading && <LoadingPage/>}
            {!loading && (
                <div className="content flex flex-col h-full">
                    <Navbar/>
                    <div className="mt-4 overflow-y-auto flex-grow">
                        <MovieList data={moviesList}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainPage;

