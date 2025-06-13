import { useEffect, useState } from "react";
import lodash from "lodash"
const API_BASE_URL = import.meta.env.VITE_APP_MOVIE_BASEURL
const API_KEY = import.meta.env.VITE_APP_APIKEY

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};


import MovieCard from "./MovieCard";
import FilterGroup from "../FilterGroup/FilterGroup";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MovieList({ type, title }) {

    const [filterMovies, setFilterMovies] = useState([]);

    const [movies, setMovies] = useState([]);

    const [page, setPage] = useState(1);

    const [filterOpen, setFilterOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [searchOpen, setSearchOpen] = useState(false);

    const [minRating, setMinRating] = useState(0);

    const [sort, setSort] = useState({

        by: "default"
    })

    
    useEffect(() => {

        const fetchMovies = async () => {
            const response = await fetch(`${API_BASE_URL}/search/movie?query=${searchQuery}`, options)

            const data = await response.json()

            setFilterMovies(data.results);
        }

        fetchMovies()
    }, [searchQuery])

    useEffect(() => {

        const fetchMovies = async () => {
            const response = await fetch(`${API_BASE_URL}/movie/${type}?page=${page}`, options)

            const data = await response.json()
            setMovies(data.results);
            setFilterMovies(data.results);
        }

        fetchMovies()
    }, [page])

    useEffect(() => {
        if (sort.by !== "default") {
            const sortedMovies = lodash.orderBy(filterMovies, [sort.by], [sort.order]);
            setFilterMovies(sortedMovies);
        }
    }, [sort]);


    const handleFilter = rate => {
        if (rate === minRating) {
            setMinRating(0);
            setFilterMovies(movies)
        } else {

            setMinRating(rate)

            const filtered = movies.filter((movie) => movie.vote_average >= rate)

            setFilterMovies(filtered)
        }
    }

    const handleSort = (e) => {
        const { name, value } = e.target;
        setSort((prev) => (
            { ...prev, [name]: value }
        ))
    }

    useEffect(()=>{
        document.addEventListener("click",(e)=>{
            e.stopPropagation();
            setSearchOpen(false)
            setFilterOpen(false)
        })

    },[])
    
    return (
        <div className="container-width py-12">
            <header className="flex items-center justify-between relative">
            <h2 className="text-2xl uppercase text-[#ffe400] font-semibold">{title}</h2>

                <div className="items-center hidden md:flex">

                    <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[7, 6, 5]} />

                    <select name='by' id='' onChange={handleSort} value={sort.by} className="border-0 outline-0 rounded-md font-normal h-8 w-fit px-1.5 mx-2.5 bg-white text-black">
                        <option value="default">Sort By</option>
                        <option value="release_date">Date</option>
                        <option value="vote_average">Rating</option>
                    </select>
                </div>

                {/* For Mobile Responsive Filter and Search Start */}

                <div className="flex items-center gap-2 md:hidden">

                    <IoIosSearch onClick={(e) => {e.stopPropagation();setSearchOpen(!searchOpen)}} className="text-2xl text-[#ffe400]" />

                    <div onClick={(e) => {e.stopPropagation();setFilterOpen(!filterOpen)}}>
                        <div className="cursor-pointer flex items-center gap-2 sm:gap-4 py-2.5 px-3 rounded-md bg-[#ffe400] text-sm text-black font-semibold uppercase border-0">
                            <h5>Filter By</h5>
                            <GiHamburgerMenu />
                        </div>
                    </div>
                </div>


                {
                    filterOpen && <div className="flex items-center absolute top-12 right-0 bg-white z-50 px-5 py-2 rounded-md">
                        <div className="text-black">

                            <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[7, 6, 5]} />
                        </div>

                        <select name='by' id='' onChange={handleSort} value={sort.by} className=" border-0 outline-0 rounded-md font-normal h-8 w-fit px-2.5 mx-2.5 bg-[#ffe400] text-black">
                            <option className="bg-white" value="default">SortBy</option>
                            <option className="bg-white" value="release_date">Date</option>
                            <option className="bg-white" value="vote_average">Rating</option>
                        </select>
                    </div>
                }

                {
                    searchOpen &&

                    <form className="flex items-center my-5 sm:max-w-9/12 md:max-w-6/12 lg:max-w-5/12 xl:max-w-4/12 sm:ms-auto absolute top-7 sm:right-20 z-50">
                        <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className="bg-white w-full py-3 px-7 outline-0 border-2 border-[#efefef] text-black text-[17px] rounded-s-full" placeholder="Search Movies" type="text" />
                        <button type="submit" className="py-3.5 pe-5 ps-4 text-2xl bg-[#ffef97] text-black rounded-e-full outline-0 border border-s-0"><IoIosSearch /></button>
                    </form>
                }

                {/* For Mobile Responsive Filter and Search End */}

            </header>

            <form className="hidden md:flex items-center my-5 sm:max-w-9/12 md:max-w-6/12 lg:max-w-5/12 xl:max-w-4/12 sm:ms-auto">
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className="bg-white w-full py-3 px-7 outline-0 border-2 border-[#efefef] text-black text-[17px] rounded-s-full" placeholder="Search Movies" type="text" />
                <button type="submit" className="py-3.5 pe-5 ps-4 text-2xl bg-[#ffef97] text-black rounded-e-full outline-0 border border-s-0"><IoIosSearch /></button>
            </form>

            {
                searchQuery &&
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-10 mt-10">
                    {filterMovies && filterMovies.length > 0 ?
                        filterMovies.map((movie) => (

                            <MovieCard key={movie.id} movie={movie} />
                        ))
                        : <div className="text-center font-extrabold uppercase text-2xl">No Data Found</div>
                    }
                </div>
            }

            {
                !searchQuery &&
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-10 mt-10">
                    {filterMovies && filterMovies.length > 0 ?
                        filterMovies.map((movie) => (

                            <MovieCard key={movie.id} movie={movie} />
                        ))
                        : <div className="text-center font-extrabold uppercase text-2xl">No Data Found</div>
                    }
                </div>
            }


            <div className="flex items-center justify-center gap-5 mt-12">

                <button className="py-2.5 px-5 border border-[#ffe400] bg-[#ffe400] text-xl text-black xl:hover:text-[#ffe400] xl:hover:bg-transparent transition-colors duration-300" onClick={() => setPage(p => p <= 0 ? 1 : p - 1)}><FaLongArrowAltLeft /></button>

                <button className="py-2.5 px-5 border border-[#ffe400] bg-[#ffe400] text-xl text-black xl:hover:text-[#ffe400] xl:hover:bg-transparent transition-colors duration-300" onClick={() => setPage(p => p + 1)}><FaLongArrowAltRight /></button>

            </div>
        </div>
    )
}
