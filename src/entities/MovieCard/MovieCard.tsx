import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

interface Props {
    id: number;
    title: string;
    width: number;
    height: number;
}

const MovieCard: React.FC<Props> = ({id, title, width, height}: Props) => {

    const navigate = useNavigate();

    const [image, setImage] = useState<string | null>('');

    useEffect(() => {
        const apiKey = '1d29b4544ce32d5298d3d17072ac6660';

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`)
            .then(response => response.json())
            .then(data => {
                const movie = data.results[0];
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
    },[])

    if (!image) {
        return null; // If image is null (poster path not found), don't render anything
    }

    return (
        <div className='' key={id} onClick={() => navigate(`/movie/${title}`)}>
            <img src={image} alt='movie-img' className={`w-[${width}px] h-[${height}px] transition-transform duration-300 transform hover:scale-105`}>
            </img>
        </div>
    )
}

export default MovieCard;