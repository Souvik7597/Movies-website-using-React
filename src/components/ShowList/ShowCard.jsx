
import star from "../../assets/star.png"

const API_IMAGE_BASE_URL = import.meta.env.VITE_APP_MOVIE_IMAGEBASEURL

export default function ShowCard({show}) {
    return (
        <div className="movie-card w-full h-full overflow-hidden rounded-md text-white relative hover:scale-[1.08] transition-all duration-300 my-8">
            <a href={`https://www.themoviedb.org/movie/${show.id}`}>
                <img className="w-full h-full" src={`${API_IMAGE_BASE_URL}${show.poster_path}`} alt="movie-poster" />

                <div className="absolute bottom-0 left0 w-full h-full p-2.5 movie-details flex flex-col justify-end transition-opacity duration-300">
                    <h3 className="text-[#ffe400]">{show.original_name}</h3>
                    <div className="flex items-center justify-between text-sm font-normal my-1.5 text-[#ffe400]">
                        <p>{show.first_air_date}</p>
                        <p className="flex items-center">{show.vote_average} <img className="w-5 h-5 ms-1.5" src={star} alt="rating-icon" /></p>
                    </div>
                    <p className="text-sm italic">{show.overview.slice(0,100)+"..."}</p>
                </div>
            </a>
        </div>
    )
}
