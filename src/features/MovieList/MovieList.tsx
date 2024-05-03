import React from 'react';
import {MovieInterface} from "../../entities/MovieCard/MovieInterface";
import MovieCard from "../../entities/MovieCard/MovieCard";

interface Props {
    data: MovieInterface[];
}
const MovieList: React.FC<Props> = ({data}: Props) => {

    return (
        <div className='flex gap-4 flex-wrap'>
            {data.map(card => <MovieCard title={card.title} id={card.id} width={250} height={375}/>
            )}
        </div>
    )
}

export default MovieList;
