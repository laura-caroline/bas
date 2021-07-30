import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from '../styles/components/Dropzone.module.css'

interface Image{
  id?: number,
  id_advertising?: number,
  image: string
}

interface DropzoneProps{
  selectImage: (images: Image[]) => void,
  imagesDefault?: Image[]
}


export default function Dropzone({selectImage, imagesDefault}: DropzoneProps){
  const [images, setImages] = useState<Image[]>([])
  
  useEffect(()=>{
    if(images?.length <= 0){
      setImages(imagesDefault as Image[])
    }
  },[imagesDefault])

  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles.length > 4){
      return ;
    }

    const imageSelected =  acceptedFiles.map((image: File)=>{
      return {
        image: URL.createObjectURL(image)
      }
    })
    setImages(imageSelected)
    selectImage(acceptedFiles)
  }, [images])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  
  return (
    <div className={styles.box_container} {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      <div className={styles.box_list_images}>
        {images?.length > 0 ? images.map((advertising)=>(
          <div style={{width: images.length === 1 ? '100%': '50%'}}>
            <img 
              className={styles.image} 
              src={advertising.image} 
              alt="Imagem do produto"
            />
          </div>
          )):(
            <div className={styles.box_info}>
              <p className={styles.info}>
                Coloque a imagem do passeio clicando aqui
              </p>
            </div>

          )}
      </div>
    </div>
  )
}
