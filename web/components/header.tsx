import Link from 'next/link'
import Head from 'next/head'

import styles from '../styles/components/Header.module.css'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

export default function Header() {
  const {user, signOut} = useAuth()
  const router = useRouter()

  const handleClick = async ()=>{
    if(user.id){
      await signOut()
      return router.push('/')
    }
    router.push('/signin')
  }

  return (
    <>
    <Head>
        <title>BAS</title>
        <meta name="description" content="Compras e vendas online" />
      </Head>
    <div className={styles.header}>
      <Link href="/" passHref>
        <a><h1>BAS</h1></a>
      </Link>
      <Link href={`/myadvertisings/${user.id}`} passHref>
        <a>Meus anuncios</a>
      </Link>
      <div className={styles.box_nav}>
        <div>
          <div className={styles.button_login}>
            <a onClick={handleClick}>{!user.id ? 'Entrar' : 'Sair'}</a>
          </div>
        </div>
        <Link href="/advertisings/create" passHref>
          <div className={styles.button_advertising}>
            <a>Anunciar</a>
          </div>
        </Link>
      </div>
    </div>
    </>
  )
}