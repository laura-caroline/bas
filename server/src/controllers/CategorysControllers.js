const {categorys} = require('../databases/models')

class CategorysControllers{
  static async insertCategory(request, response){
    const {name} = request.body

    try{
      const existsThisCategory = await categorys.findOne({where: {name}})

      if(existsThisCategory){
        return response.status(401).send({msg: 'Categoria já existe'})
      }

      const newCategory = await categorys.create({name})

      return response.status(200).send({msg: 'Categoria foi criada'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  static async readCategorys(request, response){
    try{
      const readCategorys = await categorys.findAll()
      return response.status(200).send(readCategorys)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
}


module.exports = CategorysControllers