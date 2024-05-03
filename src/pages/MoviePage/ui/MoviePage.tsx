import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Navbar from "../../../widgets/header/ui/Navbar";
import MovieList from "../../../features/MovieList/MovieList";
import {formatDate} from "../../../shared/utils/Helper";
import MovieCard from "../../../entities/MovieCard/MovieCard";

const MoviePage = () => {
    const {title} = useParams();

    const [movieTitle, setMovieTitle] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieRelease, setMovieRelease] = useState('');
    const [recommendationsDescription, setRecommendationsDescription] = useState<string[]>([]);
    const [recommendationsCast, setRecommendationsCast] = useState<string[]>([]);

    const [image, setImage] = useState<string | null>('');

    useEffect(() => {
        if (title) {
            const apiKey = '1d29b4544ce32d5298d3d17072ac6660';

            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`)
                .then(response => response.json())
                .then(data => {
                    const movie = data.results[0];
                    setMovieTitle(movie.title);
                    setMovieDescription(movie.overview);
                    setMovieRelease(movie.release_date);
                    const posterPath = movie.poster_path;
                    if (posterPath) {
                        setImage(`https://image.tmdb.org/t/p/w500${posterPath}`);
                    } else {
                        setImage(null); // Set image state to null if poster path is null
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    },[])

    useEffect(() => {
        fetch(`http://localhost:8000/content/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie_title: movieTitle })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.count_recommendations) {
                    setRecommendationsDescription(data.count_recommendations);
                    setRecommendationsCast(data.tfidf_recommendations);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [movieTitle]);

    return (
        <>
            <Navbar/>
            <div className="mt-8 overflow-y-auto flex-grow">
                <div className='flex gap-x-4 items-center'>
                    <div>
                        {image && <img src={image} alt='image' className='min-w-[200px] max-w-[200px]'/>}
                    </div>
                    <div className='flex flex-col gap-y-4 flex-wrap'>
                        <div className='text-white text-5xl font-extrabold'>{movieTitle}</div>
                        <div className='text-white'><span className='text-red-500'>Overview</span>: {movieDescription}
                        </div>
                        <div className='text-white'>Release: {formatDate(movieRelease)}</div>
                    </div>
                </div>
                <div className='text-white text-2xl my-2'>Recommended films based on description</div>
                <div className='flex gap-4 flex-wrap'>
                    {recommendationsDescription.map(card => <MovieCard title={card} id={parseInt(card)} width={100}
                                                                       height={100}/>
                    )}
                </div>
                <div className='text-white text-2xl my-2'>Recommended films based on genre, actor, director</div>
                <div className='flex gap-4 flex-wrap'>
                    {recommendationsCast.map(card => <MovieCard title={card} id={parseInt(card)} width={100}
                                                                       height={100}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default MoviePage;