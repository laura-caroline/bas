import {Advertising} from '../interfaces/Advertising'
import Link from 'next/link'
import styles from '../styles/components/ItemAdvertising.module.css'

interface AdversingProps{
  advertising: Advertising
}

export default function ItemAdvertising({advertising}: AdversingProps){
  return(
    <div className={styles.box_advertising}>
        <img 
          className={styles.image_advertising}
          src={advertising.images_advertisings[0].image}
          alt="Imagem do produto à venda"
        />
        <p>Titulo: {advertising.title}</p>
        <p>Descrição: {advertising.description}</p>
        <p>Valor: {advertising.value} R$</p>
      <div className={styles.box_button}>
        <Link href={`/advertisings/${advertising.title}/${advertising.id}`}>
          <a>Detalhes</a>
        </Link>
      </div>
    </div>
  )
}


  