import Header from '../../components/header'
import Footer from '../../components/footer'
import Search from '../../components/search'
import styles from '../../styles/pages/ListAdvertisings.module.css'
import {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import api from '../../services/api'
import {ParsedUrlQuery} from 'querystring'
import Link from 'next/link'
import {Advertising} from '../../interfaces/Advertising'
import ItemAdvertising from '../../components/item_advertising'

interface Advertisings{
  advertisings: Advertising[]
}

export default function ListAdvertisings({advertisings}: Advertisings){
  const {titleAdvertising} = useRouter().query

  return(
    <div className={styles.container}>
      <Search/>
      <div className={styles.box_title}>
        <h2>Item procurado: {titleAdvertising}</h2>
      </div>
      <div className={styles.box_advertisings}>
        {advertisings.length > 0 && advertisings.map((advertising)=>(
          <ItemAdvertising advertising={advertising}/>
        ))}
      </div>
      <Footer/>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async()=>{
  const readAdvertisings = await api.get('/advertisings')
  const data = readAdvertisings.data

  const paths = data.map((advertising: Advertising)=>{
    return {params: {titleAdvertising: advertising.title}}
  })

  return{
    paths,
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<Advertisings> = async(context)=>{
  const {titleAdvertising} = context.params!

  const readAdvertisings = await api.get(`/advertisings?q=${titleAdvertising}`)
  const data = readAdvertisings.data
  
  return{
    props: {advertisings: data},
    revalidate: 500,
  }
}



