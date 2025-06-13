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

import ShowCard from "../ShowList/ShowCard";
import FilterGroup from "../FilterGroup/FilterGroup";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Shows() {

    const [filterShows, setFilterShows] = useState([]);

    const [shows, setShows] = useState([]);

    const [minRating, setMinRating] = useState(0);

    
    const [page, setPage] = useState(1);

    const [filterOpen, setFilterOpen] = useState(false);

    const [dropdown, setDropdown] = useState(false);


    const [searchQuery, setSearchQuery] = useState("");

    const [searchOpen, setSearchOpen] = useState(false);

    const [sort, setSort] = useState({

        by: "default"
    })

    useEffect(() => {

        const fetchShows = async () => {
            const response = await fetch(`${API_BASE_URL}/search/tv?query=${searchQuery}`, options)

            const data = await response.json()

            setFilterShows(data.results);
        }

        fetchShows()
    }, [searchQuery])

    
    useEffect(() => {
        const fetchShows = async () => {
            const response = await fetch(`${API_BASE_URL}/tv/on_the_air?page=${page}`, options)
    
            const data = await response.json()
            setShows(data.results);
            setFilterShows(data.results);
        }

        fetchShows()
    }, [page])



    useEffect(() => {
        if (sort.by !== "default") {
            const sortedShows = lodash.orderBy(filterShows, [sort.by]);
            setFilterShows(sortedShows);
        }
    }, [sort]);



    const handleFilter = rate => {
        if (rate === minRating) {
            setMinRating(0);
            setFilterShows(shows)
        } else {

            setMinRating(rate)

            const filtered = shows.filter((movie) => movie.vote_average >= rate)

            setFilterShows(filtered)
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
            setDropdown(false)
            setSearchOpen(false)
            setFilterOpen(false)
        })

    },[])

    const showsLink = [
        {
            id: 1,
            nav: "Airing Today",
            links: `/airing-today`
        },
        {
            id: 2,
            nav: "Popular",
            links: `/popular-show`
        },
        {
            id: 3,
            nav: "Top Rated",
            links: `/top-rated-show`
        },
    ]


    return (
        <div className="container-width py-12">
            <header className="flex items-center justify-between relative">
                <ul className="text-xl uppercase font-semibold items-center gap-5 hidden md:flex">
    
                    {
                        showsLink.map((showlink) => (
                            <Link key={showlink.id} to={showlink.links}>
                                <li className="text-white xl:hover:text-[#ffe400] transition-colors duration-300">{showlink.nav}</li>
                            </Link>
                        ))
                    }
    
                </ul>
    
                {/* For Mobile Responsive Header Link Start */}
                <div>
                    <div onClick={(e) => {e.stopPropagation();setDropdown(!dropdown)}} className="flex md:hidden items-center gap-1 font-semibold text-[#ffe400] ">
                        <h3 className="sm:text-lg uppercase">Different Pages</h3>
                        <IoIosArrowDown className="text-2xl" />
                    </div>
    
                    {
                        dropdown &&
    
                        <ul className="z-50 text-lg uppercase font-semibold flex flex-col justify-center items-center gap-5 bg-white px-8 py-5 rounded-md absolute top-12 left-0">
    
                            {
                                showsLink.map((showlink) => (
                                    <Link key={showlink.id} to={showlink.links}>
                                        <li className="text-black xl:hover:text-[#ffe400] transition-colors duration-300">{showlink.nav}</li>
                                    </Link>
                                ))
                            }
    
                        </ul>
                    }
                </div>
    
                {/* For Mobile Responsive Header Link End */}
    
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
                    {filterShows && filterShows.length > 0 ?
                        filterShows.map((show) => (
    
                            <ShowCard key={show.id} show={show} />
                        ))
                        : <div className="text-center font-extrabold uppercase text-2xl">No Data Found</div>
                    }
                </div>
            }
    
            {
                !searchQuery &&
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-10 mt-10">
                    {filterShows && filterShows.length > 0 ?
                        filterShows.map((show) => (
    
                            <ShowCard key={show.id} show={show} />
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




