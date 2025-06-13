import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import ResponsiveNavbar from "./ResponsiveNavbar";

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


export default function Navbar() {

    const [open, setOpen] = useState(false)

    useEffect(()=>{
        document.addEventListener("click",(e)=>{
            e.stopPropagation();
            setOpen(false)
        })

    },[])

    return (
        <div className="relative">
            <nav className="container-width py-7 border-b border-[#e6e6e6]">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl text-[#ffe400] font-bold">MovieShow</h1>

                    <div>
                        <ul className="hidden sm:flex items-center gap-5">
                            {
                                navlinks.map((nav, i) => (
                                    <NavLink key={i} to={nav.links} >
                                        {({ isActive }) => (

                                            <li className={`${isActive ? "text-[#ffe400]" : "text-white"} font-bold text-lg`}>{nav.nav}</li>
                                        )}
                                    </NavLink>

                                ))
                            }

                        </ul>
                    </div>
                    <div onClick={(e)=>{e.stopPropagation();setOpen(!open)}} className="text-[#ffe400] block sm:hidden">
                        {
                            open === false ?<GiHamburgerMenu className="text-2xl" /> : <RxCross2 className="text-3xl" />
                        }
                        
                    </div>
                </div>
            </nav>

            <ResponsiveNavbar open={open} />
        </div>
    )
}
