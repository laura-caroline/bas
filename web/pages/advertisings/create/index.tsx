import { useEffect, useState, FormEvent } from "react"
import api from '../../../services/api'
import styles from '../../../styles/pages/CreateAdvertisings.module.css'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { useAuth } from "../../../hooks/useAuth"
import { useRouter } from "next/router"
import Dropzone from '../../../components/dropzone'
import { Formik } from 'formik'
import * as Yup from 'yup'



interface FormDataProps{
  id?: number ,
  title: string ,
  description: string,
  value: number ,
  name_category: string ,
  images: File[]

}

interface Category{
  id: number ,
  name: string
}


export default function CreateAdvertising() {
  const [categorys, setCategorys] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {user} = useAuth()
  const router = useRouter()


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

  useEffect(() => {
    const readCategorys = async () => {
      if(!user.id){router.push('/signin') }

      const response = await api.get('/categorys')
      const data = response.data
      setCategorys(data)
    }
    readCategorys()
  },[])

  const submitForm = async (values: FormDataProps)=>{
    setLoading(true)
    const {
      title,
      images,
      value,
      description,
      name_category,
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

    const response = await api.post(`/advertisings/${user.id}`, formData)
    const data = response.data

    router.push(`/myadvertisings/${user.id}`)

  }
  return (
    <>
    {user.id && (
      <div className={styles.container}>
      <Header />
      <div className={styles.box_content}>
        <div className={styles.box_form}>
          <h1 style={{ textAlign: 'center' }}>Criar anuncio</h1>
          <Formik
            initialValues={{
              title: '', 
              images: [], 
              value: 0, 
              name_category: '', 
              description: ''
            }}
            validationSchema={FormSchema}
            onSubmit={async (values)=>{
              return await submitForm(values)
            }}
          >
            {({handleSubmit, errors, handleChange, setFieldValue})=>(
              <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>Selecione até 4 imagens:</label>
                <Dropzone selectImage={(image)=> {
                  setFieldValue('images', image)
                }}/>
                <p className={styles.info_error}>{errors.images}</p>
              <label htmlFor="" className={styles.label}>Titulo:</label>
                <input
                  name="title"
                  placeholder="Digite o titulo do seu produto"
                  type="text"
                  className={styles.input}
                  onChange={handleChange}
                />
                <p className={styles.info_error}>{errors.title}</p>
              <label htmlFor="" className={styles.label}>Categoria:</label>
                <select 
                  name="name_category" 
                  onChange={handleChange} 
                  className={styles.select}
                >
                  <option value="">Escolha sua categoria</option>
                  {categorys.length > 0 && categorys.map((category) => (
                    <option 
                      value={category.name}>
                        {category.name}
                    </option>
                  ))}
                </select>
                <p className={styles.info_error}>{errors.name_category}</p>
              <label htmlFor="value" className={styles.label}>Valor</label>
                <input
                  name="value"
                  id="value"
                  className={styles.input}
                  type="text"
                  placeholder="Digite o valor do seu item/produto"
                  onChange={handleChange}
                />
                <p className={styles.info_error}>{errors.value}</p>
              <label htmlFor="description" className={styles.label}>Descrição:</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Digite sua descrição"
                  className={styles.input}
                  onChange={handleChange}
                />
                <p className={styles.info_error}>{errors.description}</p>
              <button 
                disabled={loading} 
                onClick={()=> handleSubmit()} 
                className={styles.button_login}
              >
                Criar anuncio
              </button>
            </form>
            )}
            
          </Formik>
          
        </div>
      </div>
    </div>
    )}
    </>

  )
} 