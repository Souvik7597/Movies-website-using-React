

const API_IMAGE_BASE_URL = import.meta.env.VITE_APP_MOVIE_IMAGEBASEURL


export default function Banner({ movie }) {
    const bgStyle = {
        backgroundImage: `url(${API_IMAGE_BASE_URL}${movie.poster_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundcolor: "linear-gradient(rgba(55, 81, 126, 0.4) 40%, rgba(55, 81, 126, 0.7) 100%)"
    }
    return (
        <div style={bgStyle} className="h-140">

            <div className="text-white container-width h-140 grid grid-cols-1 md:grid-cols-2 items-center justify-center">
                <div>
                    <h3 className="text-[#ffe400] text-4xl mb-3">{movie.original_title}</h3>
                    <div className="flex items-center gap-20 text-sm font-normal my-1.5 text-[#ffe400] mb-6">
                        <p>{movie.release_date}</p>
                        <p className="flex items-center">{movie.vote_average}</p>
                    </div>
                    <div>
                        <p className="leading-6 italic">{movie.overview.slice(0, 140)}</p>
                    </div>

                    <button className="py-2.5 px-5 bg-[#ffe400] rounded-lg xl:border xl:border-[#ffe400] mt-10 text-black font-semibold xl:hover:bg-transparent xl:hover:text-[#ffe400] transition-colors duration-300"><a href={`https://www.themoviedb.org/movie/${movie.id}`}>Play Now</a></button>
                </div>

            </div>

        </div>
    )
}
