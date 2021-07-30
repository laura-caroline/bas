import { useEffect, useState, FormEvent} from "react"
import {useRouter} from 'next/router'
import api from '../../services/api'
import Link from 'next/link'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from '../../styles/pages/MyAdvertisings.module.css'
import { useAuth } from "../../hooks/useAuth"
import {Advertising} from '../../interfaces/Advertising'


export default function MyAdvertisings(){
  const [advertisings, setAdvertisings] = useState<Advertising[]>([])
  const {id_user} = useRouter().query
  const router = useRouter()
  const {user} = useAuth()

  useEffect(()=>{
    const readAdvertisingsUser = async ()=>{
      if(!user.id){ return router.push('/signin')}

      const advertisingsUser = await api.get(`/users/advertisings/${user.id}`)
      const data = advertisingsUser.data
      return setAdvertisings(data)
    }
    readAdvertisingsUser()
  },[id_user])

  const deleteAdvertising = async (id_advertising : number)=>{
    if(window.confirm('Voce desejar excluir esse anuncio?')){
      const response = await api.delete(`/advertisings/${id_advertising}`)
      const data = response.data

      const updateState = advertisings.filter((advertising : Advertising)=>{
        return advertising.id !== id_advertising
      })  
      setAdvertisings(updateState)
      alert(data.msg)
    }
  }

  return(
    <>
    {user.id && (  
      <div className={styles.container}>
        <Header/>
        <div className={styles.box_title}>
          <h1>Meus anuncios</h1>
        </div>
        <div className={styles.box_advertisings}>
          {advertisings?.length > 0 ? advertisings.map((advertising)=>(
            <div className={styles.box_advertising}>
              <img 
                className={styles.image_advertising}
                src={advertising.images_advertisings[0]?.image}
                alt="Imagem do produto"
              />
              <div className={styles.box_info_advertising}>
                <p>Titulo: {advertising.title}</p>
                <p>Descrição: {advertising.description}</p>
                <p>Valor: {advertising.value} R$</p>
              </div>
              <div className={styles.box_actions_advertising}>
                <Link href={`/myadvertisings/update/${advertising.id}`}>
                  <button>Editar</button>
                </Link>
                <button 
                  onClick={()=> deleteAdvertising(advertising.id)}>
                    Deletar
                </button>
              </div>
            </div>
          )):(
            <div>
              <p className={styles.info_error}>Não há anuncios criados por este usuário</p>
            </div>
          )}
        </div>
      <Footer/>
    </div>
    )}
    </>
  )
}