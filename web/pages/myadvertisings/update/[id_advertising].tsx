import {ChangeEvent, useEffect, useState} from 'react'
import api from '../../../services/api'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import styles from '../../../styles/pages/UpdateAdvertising.module.css'
import {useAuth} from '../../../hooks/useAuth'
import Dropzone from '../../../components/dropzone'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {useRouter} from 'next/router'


interface Image{
  id?: number,
  id_advertising?: number,
  image: string
}

interface FormDataProps{
  id?: number ,
  title: string ,
  description: string,
  value: number ,
  name_category: string ,
  images: Image[]

}

interface Category{
  id: number ,
  name: string
}


export default function UpdateAdvertising(){
  const {id_advertising} = useRouter().query
  const [categorys, setCategorys] = useState<Category[]>([])
  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps)
  
  const router = useRouter()
  const {user} = useAuth()

  const FormSchema = Yup.object().shape({
    title: Yup
      .string()
      .required('Campo obrigatorio')
    ,

    images: Yup
      .array()
      .required('Campo obrigatorio')
    ,
    value: Yup
      .number()
      .required('Campo obrigatorio')
    ,
    name_category: Yup
      .string()
      .required('Campo obrigatorio')
    ,
    description: Yup
      .string()
      .required('Campo obrigatorio')
  })


  useEffect(()=>{
    const readAdvertisingWasUpdate = async ()=>{
      if(!user.id){return router.push('/')}

      const response = await api.get(`/advertisings/${id_advertising}`)
      const data = response.data
      const parsedData = {
        title: data.title,
        name_category: data.category?.name,
        value: data.value,
        description: data.description,
        images: data.images_advertisings
      }
      setFormData(parsedData as FormDataProps)
    }
    
    const readCategorys = async ()=>{
      const response = await api.get('/categorys')
      const data = response.data
      setCategorys(data)
    }

    readAdvertisingWasUpdate()
    readCategorys()
    
  },[id_advertising])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {value, name} = event.target

    return setFormData({...formData, [name]: value})
  }

  const submitForm = async (values:  FormDataProps)=>{
    const {
      title,
      description,
      images,
      name_category,
      value
    } = values

    const findIdCategory = categorys.find((category)=> category.name === name_category)
    const idCategory  = findIdCategory?.id

    const formData = new FormData()
 
    formData.append('title', title)
    formData.append('value', String(value))
    formData.append('description', description)
    formData.append('id_category', String(idCategory))
    

    for(let i=0; i <= images.length; i++){
      formData.append('images', images[i])
    }

    const response = await api.put(`/advertisings/${id_advertising}`, formData)
    const data = response.data

    router.push(`/myadvertisings/${user.id}`)
  }

  console.log(formData)
  return(
    <div className={styles.container}>
      <Header/>
      <div className={styles.box_title}>
        <h1>Atualizar anuncio</h1>
      </div>
      <div className={styles.box_form}>
        <Formik
          initialValues={formData}
          validationSchema={FormSchema}
          enableReinitialize={true}
          onSubmit={async (values)=>{
            return await submitForm(values)
          }}
        >
          {({errors, handleSubmit})=>(
            <form onSubmit={handleSubmit}className={styles.form}>
              <label className={styles.label}>Selecione até 4 imagens:</label>
                {formData.images && (
                  <Dropzone 
                    imagesDefault={formData.images} 
                    selectImage={(images)=> {
                      setFormData({...formData, images: images})
                    }}
                  />
                )}
                <p className={styles.info_error}>{errors.images}</p>
              <label htmlFor="" className={styles.label}>Titulo</label>
                <input
                  name="title"
                  type="text" 
                  value={formData.title}
                  className={styles.input}
                  onChange={handleChange}
                />
                <p className={styles.info_error}>{errors.title}</p>
              <label htmlFor="" className={styles.label}>Categoria</label>
                <select 
                  name="name_category" 
                  onChange={handleChange} 
                  className={styles.select} 
                  value={formData.name_category} 
                >
                  <option value="">Escolha sua categoria</option>
                  {categorys.length > 0 && categorys.map((category)=>(
                    <option 
                      value={category.name}>
                        {category.name}
                    </option>
                  ))}
                </select>
                <p className={styles.info_error}>{errors.name_category}</p>
              <label htmlFor="" className="label">Valor</label>
                <input 
                  name="value" 
                  type="text" 
                  className={styles.input}
                  value={formData.value}
                  onChange={handleChange} 

                />
                <p className={styles.info_error}>{errors.value}</p>
              <label htmlFor="" className={styles.label}>Descrição</label>
                <textarea 
                  name="description"
                  className={styles.input}
                  value={formData.description}
                  onChange={handleChange}

                />
                <p className={styles.info_error}>{errors.description}</p>
              <button 
                onClick={()=> handleSubmit()}
                className={styles.button_submit}>
                  Atualizar anuncio
              </button>
          </form>
          )}
        </Formik>
      </div>
      <Footer/>
    </div>
  )
}