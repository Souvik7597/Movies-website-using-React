import { Link, NavLink } from "react-router-dom"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";

const navlinks = [
    {
        id: 1,
        nav: "Home",
        links: "/"
    },
    {
        id: 2,
        nav: "Movies",
        links: "/movies"
    },
    {
        id: 3,
        nav: "Shows",
        links: "/shows"
    },
]

export default function Footer() {
    return (
        <div className="border-t">
            <div className="container-width py-12 grid grid-cols-1 xl:grid-cols-[1.5fr_0.5fr] gap-8 xl:gap-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                    <div>
                        <h1 className="text-3xl text-[#ffe400] font-bold mb-5"><Link to={"/"}>MovieShow</Link></h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-8 w-8 border rounded-full text-sm border-[#ffe400] xl:hover:bg-[#ffe400] xl:hover:text-black transition-colors duration-300">
                                <FaGoogle />
                            </div>
                            <div className="flex items-center justify-center h-8 w-8 border rounded-full text-sm border-[#ffe400] xl:hover:bg-[#ffe400] xl:hover:text-black transition-colors duration-300">
                                <IoLogoYoutube />
                            </div>
                            <div className="flex items-center justify-center h-8 w-8 border rounded-full text-sm border-[#ffe400] xl:hover:bg-[#ffe400] xl:hover:text-black transition-colors duration-300">
                                <FaFacebook />
                            </div>
                            <div className="flex items-center justify-center h-8 w-8 border rounded-full text-sm border-[#ffe400] xl:hover:bg-[#ffe400] xl:hover:text-black transition-colors duration-300">
                                <FaInstagram />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 xl:mt-3">
                        <h3 className="text-xl text-[#ffe400] font-bold">Useful Links</h3>
                        <ul className="flex flex-col items-start gap-3">
                            {
                                navlinks.map((nav, i) => (
                                    <Link key={i} to={nav.links} >

                                        <li className="text-white font-semibold">{nav.nav}</li>
                                    </Link>

                                ))
                            }

                        </ul>
                    </div>
                    <div className="flex flex-col gap-5 xl:mt-3">
                        <h3 className="text-xl text-[#ffe400] font-bold">Legal Links</h3>
                        <div className="flex flex-col items-start gap-3 text-white font-semibold">
                            <a href="#">Terms of Use</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">DMCA Policy</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 xl:mt-3">
                    <h3 className="text-xl text-[#ffe400] font-bold">Subscribe</h3>
                    <form className="flex items-center lg:w-9/12">
                        <input className="bg-white max-w-full py-2 px-7 outline-0 border-2 border-[#efefef] text-black text-sm sm:text-[17px] rounded-s-full" placeholder="Your Email" type="text" />
                        <button type="submit" className=" text-sm sm:text-[16px] py-2.5 px-3 bg-[#ffef97] text-black rounded-e-full outline-0 font-semibold border border-s-0">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="py-5 text-center">
                <p className="text-sm text-white">@copyright 2025 Made By Souvik</p>
            </div>
        </div>
    )
}
