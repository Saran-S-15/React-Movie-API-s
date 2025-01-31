import React from 'react'

const MovieCard = ({ movie }) => {
    return (
        <div key={movie.id} className='movie-card'>
            <img src={movie.primaryImage ? movie.primaryImage : './no-movie.png'} alt='' className='w-full h-[400px] bg-cover bg-center rounded-lg' />
            <p className='text-white font-bold text-2xl mt-2'>{movie.primaryTitle}</p>
            <div className='flex'>
                <img src="star.svg" alt='star' className='w-[20px]' />
                <p className='text-white ms-1'>{movie.averageRating ? movie.averageRating : 'N/A'}</p>
                <p className='text-gray-100 ms-4'>{movie.startYear}</p>
            </div>
        </div>
    )
}

export default MovieCard;