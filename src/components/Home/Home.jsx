import { useState, useEffect } from "react";
import MovieCard from "../MovieList/MovieCard";
import { Link } from "react-router-dom";
import ShowCard from "../ShowList/ShowCard";
import Banner from "./Banner";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination } from 'swiper/modules';

const API_BASE_URL = import.meta.env.VITE_APP_MOVIE_BASEURL
const API_KEY = import.meta.env.VITE_APP_APIKEY
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};


export default function Home() {


    const [movies, setMovies] = useState([]);

    const [shows, setShows] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`${API_BASE_URL}/trending/movie/day?`, options)

            const data = await response.json()
            setMovies(data.results);
        }

        fetchMovies()
    }, [])

    useEffect(() => {
        const fetchShows = async () => {
            const response = await fetch(`${API_BASE_URL}/trending/tv/day?`, options)

            const data = await response.json()
            setShows(data.results);
        }

        fetchShows()
    }, [])


    return (
        <div className="pt-8">
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
            >
                <div>
                    {
                        movies.slice(4,8).map((movie) => (
                            <SwiperSlide>

                                <Banner key={movie.id} movie={movie} />
                            </SwiperSlide>
                        ))
                    }
                </div>
            </Swiper>
            <div className="container-width">
                <div className="py-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl uppercase font-bold text-[#ffe400]">Movies</h2>
                        <button className="py-1.5 px-5 border font-semibold border-[#ffe400] bg-[#ffe400] text-black hover:bg-transparent hover:text-[#ffe400] rounded-lg transition-colors duration-300"><Link to={"/movies"}>Show More</Link></button>

                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-10 mt-10">

                        {
                            movies.slice(0, 5).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        }
                    </div>
                </div>
                <div className="py-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl uppercase font-bold text-[#ffe400]">Shows</h2>
                        <button className="py-1.5 px-5 border font-semibold border-[#ffe400] bg-[#ffe400] text-black hover:bg-transparent hover:text-[#ffe400] rounded-lg transition-colors duration-300"><Link to={"/shows"}>Show More</Link></button>

                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-10 mt-10">

                        {
                            shows.slice(0, 5).map((show) => (
                                <ShowCard key={show.id} show={show} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
