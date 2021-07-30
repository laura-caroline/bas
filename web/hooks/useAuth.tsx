import {useContext} from 'react'
import {AuthContext} from '../contexts/authenticate'

export const useAuth = ()=>{
  const value = useContext(AuthContext)
  return value
}