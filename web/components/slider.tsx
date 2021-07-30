import styles from '../styles/components/Slider.module.css'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

interface Image{
  id: number,
  id_advertising: number,
  image: string
}

interface Items{
  list_images: Image[]
}

export default function Slider({list_images}: Items){
  return(
    <AwesomeSlider>
      {list_images.map((item: Image)=>(
        <div className={styles.box_image}>
          <img 
            className={styles.image}
            src={item.image} 
            alt="Imagem do produto"
          />

        </div>
      ))}
    </AwesomeSlider>
  )
} 



