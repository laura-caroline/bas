require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users}  = require('../databases/models')


class UsersControllers{
  static async insertUser(request, response){
    const {user, password, phone} = request.body

    try{
      const existsThisUser = await users.findOne({where: {user}})

      if(existsThisUser){
        return response.status(401).send({msg: 'Usuário já existe'})
      }

      const hashPassword = await bcrypt.hash(password, 6)

      const newUser = await users.create({user, password: hashPassword, phone})

      return response.status(200).send({msg: 'Usuário foi criado'})

    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  static async authenticateUser(request, response){
    const {user, password} = request.body

    try{
      const existsThisUser = await users.findOne({where:{user}})

      if(!existsThisUser){
        return response.status(401).send({msg: 'Usuário não existe'})
      }
  
      if(!await bcrypt.compare(password, existsThisUser.password)){
        return response.status(401).send({msg: 'Senha invalida'})
      }
  
      const token = jwt.sign({id: existsThisUser.id}, '@user', {expiresIn: 86400})
  
      return response.status(200).send({token, user: {id: existsThisUser.id}})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
}


module.exports = UsersControllers