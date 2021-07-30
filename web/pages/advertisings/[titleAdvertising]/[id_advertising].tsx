import Header from '../../../components/header'
import Footer from '../../../components/footer'

import styles from '../../../styles/pages/DetailsAdvertising.module.css'
import {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import api from '../../../services/api'

import Slider from '../../../components/slider'

interface Advertising{
  id: number,
  id_user: number,
  id_category: number,
  title: string,
  description: string,
  value: number,
  created: Date,
  images_advertisings: [
    {
      id: number,
      id_advertising: number,
      image: string
    }
  ]
  user: {
    id: number,
    user: string,
    password: string,
    phone: string,
  },
  category:{
    id: number,
    name: string,
  }
}

interface AdvertisingProps{
  advertising: Advertising
}

export default function DetailsAdvertising({advertising}: AdvertisingProps){
  const {titleAdvertising, id_advertising} = useRouter().query

  return(
    <div className={styles.container}>
      <Header/>
      <div className={styles.box_title}>
        <h1>Detalhes sobre o anuncio</h1>
        <h3>Anuncio exibido: {titleAdvertising}</h3>
      </div>
      <div className={styles.box_advertisings}>
        <div className={styles.box_advertising}>
          <p>Imagens do item anunciado: </p>
          <div style={{width: '100%'}}>
            <Slider list_images={advertising.images_advertisings}/>
          </div>
          <div className={styles.box_info}>
            <p>Descrição: {advertising.description}</p>
            <p>Valor: {advertising.value} R$</p>
            <p>Contato: {advertising.user.phone}</p>
          </div>
        </div>
        </div>  
      <Footer/>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async ()=>{
  const readAdvertisings = await api.get('/advertisings')
  const data = readAdvertisings.data
  
  const paths = data.map((advertising: Advertising)=>{
    return {params: {titleAdvertising: advertising.title, id_advertising: advertising.id.toString()}}
  })

  return{
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<AdvertisingProps> = async(context)=>{
  const {id_advertising} = context.params!
  const readAdvertising = await api.get(`/advertisings/${id_advertising}`)
  const data = readAdvertising.data

  return{
    props: {advertising: data},
    revalidate: 5000
  }
}
