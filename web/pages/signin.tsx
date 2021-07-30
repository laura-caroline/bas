import Link from 'next/link'
import styles from '../styles/pages/Signin.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import { Formik } from 'formik'
import * as Yup from 'yup'
import  api  from '../services/api'
import {useRouter} from 'next/router'
import {useAuth} from '../hooks/useAuth'
import React, {useState} from 'react'

interface FormData{
  user: string,
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const {signIn} = useAuth()

  const [loading, setLoading] = useState<boolean>(false)

  const FormSchema = Yup.object().shape({
    user: Yup
      .string()
      .required('Campo obrigatório')
    ,
    password: Yup
      .string()
      .required('Campo obrigatório')
    ,
  })

  const submitForm = async (values: FormData, setFieldError: (field: string, value: string | undefined) => void)=>{
    try{
      setLoading(true)
      const response = await api.post('/users/auth', values)
      const data = response.data
      
      if(data.token){
        signIn(data)
        return router.push(`/myadvertisings/${data.user.id}`)
      }

    }
    catch(error){
      setLoading(false)
      return setFieldError('password', error.response.data.msg)
    }
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
          <h3 style={{ textAlign: 'center' }}>Acesse sua conta</h3>
          <Formik 
            initialValues={{user: '', password: ''}}
            validationSchema={FormSchema}
            onSubmit={(values, {setFieldError})=>{
              return submitForm(values, setFieldError)
            }}
          >
            {({errors, handleChange,handleSubmit})=>(
              <>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="user">Usuário:</label>
                  <input 
                    name="user"
                    id="user" 
                    className={styles.input} 
                    type="text" 
                    placeholder="Digite seu usuário"
                    onChange={handleChange}
                  />
                  <p className={styles.info_error}>{errors.user}</p>
                <label className={styles.label} htmlFor="password">Senha:</label>
                  <input 
                    name="password"
                    id="password" 
                    className={styles.input} 
                    type="password" 
                    placeholder="Digite sua senha" 
                    onChange={handleChange}
                  />
                  <p className={styles.info_error}>{errors.password}</p>
                <div className={styles.box_navigation}>
                  <button 
                  disabled={loading}
                  className={styles.button_login}
                  onClick={()=> handleSubmit()}>
                    Entrar
                  </button>
                  <Link href="/signout">
                    <a>Criar conta</a>
                  </Link>
                </div>
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