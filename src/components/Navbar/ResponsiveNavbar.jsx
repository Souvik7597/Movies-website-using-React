import { NavLink } from "react-router-dom"


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

export default function ResponsiveNavbar({ open }) {
    return (
        <div>
            {
                open &&
                <nav className="py-7 border-b border-[#e6e6e6] absolute top-0 left-0 bg-white z-50 w-7/12 h-svh">
                    <div className="flex items-start flex-col gap-10">
                        <h1 className="text-3xl px-5 text-[#ffe400] font-bold">MovieShow</h1>

                        <div>
                            <ul className="flex ps-15 flex-col gap-5">
                                {
                                    navlinks.map((nav, i) => (
                                        <NavLink key={i} to={nav.links} >
                                            {({ isActive }) => (

                                                <li className={`${isActive ? "text-[#ffe400]" : "text-black"} font-bold text-lg`}>{nav.nav}</li>
                                            )}
                                        </NavLink>

                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            }
        </div>
    )
}
