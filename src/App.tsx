import {  useSearchParams } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./components/Hero"
import SearchBar from "./components/SearchBar"
import Filter from "./components/Filter"
import { useEffect, useState } from "react"
import fetchCars from "./utils/fetchCars.ts"
import { CarType } from "./type"
import Warning from "./components/Warning"
import Card from "./components/Card"
import LoadMore from "./components/LoadMore.tsx"
import { fuels,years } from "./utils/constants.ts"



const App = () => {
  const [params]=useSearchParams()
  const [cars,setCars]=useState<CarType[] | null>(null)
  const [isError,setIsError]=useState<boolean>(false)
  const [limit,setLimit]=useState<number>(5)
  
  useEffect(()=>{
    const paramsObj=Object.fromEntries(params.entries());
    console.log(paramsObj)
    fetchCars({limit,...paramsObj}).then(data=>setCars(data)).catch(()=>setIsError(true))
  },[limit,params]);
  console.log(isError,cars)
  return (
    
      
      <div className="min-h-screen text-white bg-[rgb(23,23,23)]">
        <Header/>
        <Hero/>

        <div className="mt-12 padding-x padding-y max-width">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
            <p>Beğenebileceğin Arabaları Keşfet</p>
            </div>

            <div className="home__filters">
              <SearchBar/>

              <div className="home__filter-container">
                <Filter options={fuels} name="fuel_type"/>
                <Filter options={years} name="year"/>
              </div>
            
          </div>
          {/* Araçları Listeleme
        1) Veri null ise > Henüz api'dan cevap gelmemiştir
        2) isError true ise > api'dan hata gelmişştir
        3) veri boş dizi ise> aranılan kritere uygun dizi yoktur
        4) Veri dolu ise > api'dan araçlar gelmiştir
         */}
        {!cars ? (<Warning>Yükleniyor...</Warning>) : isError ? (<Warning >
          Üzgünüz bir sorun oluştu...
        </Warning>) : cars.length<1 ? (<Warning >
          Aranılan Kriterlere Uygun Araç Bulunamadı...
        </Warning>) : cars.length>1 && (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car,i)=>(
                <Card car={car} key={i}/>
              ))}

              
            </div>
            <LoadMore limit={limit} handleClick={()=>{setLimit(limit + 5)}}/>
            </section>
        )}
        

        </div>
        </div>
     
    
  )
}

export default App