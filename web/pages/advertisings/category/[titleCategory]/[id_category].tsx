import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Search from '../../../../components/search'
import styles from '../../../../styles/pages/ListAdvertisings.module.css'
import {useRouter} from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import api from '../../../../services/api'
import Link from 'next/link'
import {Category} from '../../../../interfaces/Category'
import ItemAdvertising from '../../../../components/item_advertising'

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
  ],
  category: {
    id: number,
    name: string
  }
  
}

interface AdvertisingsBaseadCategory{
  advertisings_basead_category: Advertising[]
}


export default function ListAdvertisingsBaseadInCategory({advertisings_basead_category}: AdvertisingsBaseadCategory){
  const {titleCategory} = useRouter().query

  return(
    <div className={styles.container}>
      <Header/>
      <Search/>
      <div className={styles.box_title}>
        <h2>Categoria procurada: {titleCategory}</h2>
      </div>
      <div className={styles.box_advertisings}>
        {advertisings_basead_category?.length > 0 ? advertisings_basead_category.map((advertising)=>(
          <ItemAdvertising advertising={advertising}/>
        )):(
          <div>
            <p className={styles.info_error}>Não possui nenhum anuncio nesta categoria</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async()=>{
  const readCategorys = await api.get('/categorys')
  const data = readCategorys.data
  
  const paths = data.map((category: Category)=>{
    return {params: {titleCategory: category.name, id_category: category.id.toString()}}
  })
  return{
    paths,
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<AdvertisingsBaseadCategory> = async(context)=>{
  const {id_category} = context.params!

  const readAdvertisingsBasedInCategory = await api.get(`/advertisings/category/${id_category}`)
  const data = readAdvertisingsBasedInCategory.data
  
  return{
    props: {advertisings_basead_category: data},
    revalidate: 500,
  }
}



