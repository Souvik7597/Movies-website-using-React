import { Route, Routes } from "react-router-dom"
import MovieList from "./components/MovieList/MovieList"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import ShowList from "./components/ShowList/ShowList"
import Movies from "./components/Movies/Movies"
import Shows from "./components/Shows/Shows"
import Footer from "./components/Footer/Footer"


function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/popular" element={<MovieList type="popular" title="Popular" />} />
        <Route path="/top-rated" element={<MovieList type="top_rated" title="Top Rated" />} />
        <Route path="/upcoming" element={<MovieList type="upcoming" title="Upcoming" />} />


        <Route path="/shows" element={<Shows />} />
        <Route path="/airing-today" element={<ShowList type="airing_today" title="Airing Today" />} />
        <Route path="/popular-show" element={<ShowList type="popular" title="Popular" />} />
        <Route path="/top-rated-show" element={<ShowList type="top_rated" title="Top Rated" />} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
