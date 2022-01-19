import React, {useEffect, useState} from "react";
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/Listas/MovieRow';
import FeaturedMovie from './components/Featured/FeaturedMovie';
import Header from './components/Header/Header';



export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
      const loadAll = async () => {
          //PEGANDO A LISTA TOTAL
          let list = await Tmdb.getHomeList()
          setMovieList(list)

          //Pegando Featured
          let originals = list.filter(i => i.slug === 'originals')
          let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
          let chosen = originals[0].items.results[randomChosen]
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
          setFeaturedData(chosenInfo)
      }
      loadAll()
  }, [])

  useEffect(() => {
      const scrollListner = () => {
          if(window.scrollY > 10) {
              setBlackHeader(true)
          }else {
              setBlackHeader(false)
          }
      }

      window.addEventListener('scroll', scrollListner)

      return () => {
          window.removeEventListener('scroll', scrollListner)
      }

  }, [])

  return (
      <div className='page'>

          <Header black = {blackHeader}></Header>

          {featuredData &&
              <FeaturedMovie item ={featuredData}></FeaturedMovie>
          }

          <section className='lists'>
              {movieList.map((item, key) => (
                  <MovieRow key = {key} title = {item.title} items = {item.items}></MovieRow>
              ))}
          </section>

          <footer>
              Feito com <span role='img' aria-label='coração'>❤</span> por <a href='https://www.linkedin.com/in/guilhermegabriellisboadasilva/'>Guilherme Gabriel </a>. <br/>
              Projeto realizado para estudo. <br/>
              Dados coletados diretamente do site  <a href='https://www.themoviedb.org/'>TheMovieDataBase</a>.
          </footer>

      </div>
  )
}