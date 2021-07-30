import Link from 'next/link'
import styles from '../styles/pages/Signout.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../services/api'
import {useRouter} from 'next/router'

interface FormData{
  user: string,
  password: string
  phone: string,
}

export default function SignOut() {

  const router = useRouter()

  const FormSchema = Yup.object().shape({
    user: Yup
      .string()
      .required('Campo obrigatório')
    ,
    password: Yup
      .string()
      .required('Campo obrigatório')
    ,
    phone: Yup
    .string()
    .matches(/^\((\d+)\)\9(\d){4}\-(\d){4}/, 'Formato valido: (99)99999-9999')
    .required('Campo obrigatório')
    ,
  })

  const submitForm = async (values: FormData)=>{
    const response = await api.post('/users', values)
    const data = response.data

    router.push('/signin')
  }

  return (
    <div className={styles.container}>
      <div className={styles.box_content}>
        <div className={styles.box_logo}>
          <Link href="/">
            <a><h1>BAS</h1></a>
          </Link>
        </div>
        <div className={styles.box_form}>
          <Formik 
            initialValues={{
              user: '', 
              password:'', 
              phone: ''
            }}
            validationSchema={FormSchema}
            onSubmit={async (values)=>{
              return submitForm(values)
            }}
            >
              {({errors, handleChange, handleSubmit})=>(
                <>
                  <form onClick={handleSubmit} className={styles.form}>
                    <h3 style={{ textAlign: 'center' }}>Crie sua conta</h3>
                    <label className={styles.label} htmlFor="user">Usuário:</label>
                      <input 
                        id="user"
                        name="user" 
                        placeholder="Digite seu usuário" 
                        className={styles.input} 
                        type="text"
                        onChange={handleChange}
                      />
                      <p className={styles.info_error}>{errors.user}</p>
                    <label className={styles.label} htmlFor="password">Telefone:</label>
                      <input 
                        name="phone"
                        placeholder="(82)98877-5566" 
                        id="text" 
                        className={styles.input} 
                        type="text" 
                        onChange={handleChange}
                      />
                      <p className={styles.info_error}>{errors.phone}</p>
                    <label className={styles.label} htmlFor="password">Senha:</label>
                      <input 
                        name="password"
                        placeholder="Digite sua senha" 
                        id="password" 
                        className={styles.input} 
                        type="password" 
                        onChange={handleChange}
                      />
                      <p className={styles.info_error}>{errors.password}</p>
                   
                    <button 
                      onClick={()=> handleSubmit()}
                      className={styles.button_login}>
                        Criar conta
                    </button>
                  </form>
                </>
              )}
            
          </Formik>
         
        </div>
      </div>
      <Footer/>
    </div>
  )
}