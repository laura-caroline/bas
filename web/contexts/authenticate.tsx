import React, {createContext,ReactNode, useState, useEffect} from 'react'

interface User{
  id: number;
  user: string;
  password: string;
  phone: string;
}

interface DataUser{
  token: string,
  user: User;
}

interface AuthContext{
  user: User;
  signIn: (data: DataUser)=> void;
  signOut: () => void;
}

interface AuthContextProviderProps{
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContext) 

export const AuthProvider = ({children}: AuthContextProviderProps)=>{
  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(()=>{
    const readUserStoraged = async ()=>{
      setLoading(true)

      const dataUser = JSON.parse(localStorage.getItem('@user') || `{}`)
      setUser(dataUser)

      setLoading(false)

    }
    readUserStoraged()
  },[])

  const signIn = (data: DataUser)=>{
    console.log('signIN')
    console.log(data)
    localStorage.setItem('@token',data.token)
    localStorage.setItem('@user', JSON.stringify(data.user))

    return setUser(data.user as User)
  }

  const signOut = ()=>{
    localStorage.setItem('@token', '')
    localStorage.setItem('@user', JSON.stringify({}))

    setUser({} as User)
  }

  if(loading){
    return <p>Carregando</p>
  }
  return(
    <AuthContext.Provider value={{user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}
