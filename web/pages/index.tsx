import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/pages/Home.module.css'
import api from '../services/api'
import Header from '../components/header'
import Footer from '../components/footer'
import Search from '../components/search'
import {Advertising} from '../interfaces/Advertising'
import ItemAdvertising from '../components/item_advertising'

interface AdvertisingProps {
  advertisings_recents: Advertising[]
}

export default function Home({advertisings_recents}: AdvertisingProps) {
  return (
    <div className="container">
      <div className={styles.main}>
        <Header/>
        <Search/>
        <h1 className={styles.title}>Ultimos anuncios inseridos:</h1>
        <div className={styles.box_advertisings_recents}>
          {advertisings_recents.length > 0 ? advertisings_recents.map((advertising)=>(
             <ItemAdvertising advertising={advertising}/>
          )):(
            <div>
              <p className={styles.info_error}>Não há anuncios disponiveis</p>
            </div>
          )}
        </div>
        <Footer/>
      </div>
     </div>
  )
}

export const getStaticProps: GetStaticProps<AdvertisingProps> = async ()=>{
  const readAdvertisingsRecents = await api.get('/advertisings?limit=8')
  const advertisingsRecents = readAdvertisingsRecents.data

  return{
    props: {advertisings_recents: advertisingsRecents},
    revalidate: 5000
  }
}