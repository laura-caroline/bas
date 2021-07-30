require('dotenv').config()
console.log(process.env.JWT_TOKEN)
const {promisify} = require('util')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = async (request, response, next)=>{
  const authHeader = request.headers.authorization
  if(!authHeader){
    return response.status(401).send({msg: 'Token not provided'})
  }

  const [, token] = authHeader.split(' ')
  console.log(token)

  try{
    const decoded = await promisify(jwt.verify)(token, "@user")
    console.log(decoded)
    next()
  }
  catch(error){
    return response.status(401).send({msg: 'Token invalid'})
  }

}