const { Op } = require("sequelize")
const {advertisings,users, categorys, images_advertisings} = require("../databases/models")


class AdvertisingControllers{
  static async insertAdvertising(request, response){
    const {id_user} = request.params
    const {
      id_category,
      title,
      description,
      value,
    } = request.body
    try{
      const newAdvertising = await advertisings.create({
        id_user,
        id_category,
        title,
        description,
        value,
      })
      const parsedImages = request.files.map((image)=>{
        return{
          id_advertising: newAdvertising.id,
          image: `http://192.168.1.48:8080/uploads/${image.filename}`
        }
      })
      const insertImagesOfAdvertising = await images_advertisings.bulkCreate(parsedImages)

      return response.status(200).send({msg: 'Anuncio criado'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  static async readAdvertising(request, response){
    const {id} = request.params

    try{
      const readAdvertising = await advertisings.findOne({include: [
        {model: images_advertisings},
        {model: users},
        {model: categorys}
      ], where: {id}})

      return response.status(200).send(readAdvertising)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  static async readAdvertisings(request, response){
    const {limit, q} = request.query
    try{
      // Limit for advertisings more recents
      if(limit){
        const readAdvertisings = await advertisings.findAll({
          order: [['created', 'DESC']],
          limit: parseInt(limit),
          include: [
            {
              model: images_advertisings
            }
          ]
        })
        return response.status(200).send(readAdvertisings)
      }

      // Filter of search 
      if(q){
        const readAdvertising = await advertisings.findAll({include:{
          model: images_advertisings
        },
          where:{
            title: {[Op.like]: `%${q}%`}
          }
        })
        return response.status(200).send(readAdvertising)
      }
      // All without filter
      const readAdvertisings = await advertisings.findAll({
        include: [
          {model: users},
          {model: images_advertisings},
        ]
      })
      return response.status(200).send(readAdvertisings)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  static async readAdvertisingsUser(request, response){
    const {id_user} = request.params

    try{
      const readAdvertisingsUser = await advertisings.findAll({include:[
        {model: images_advertisings},
        {model: users,}
      ], where: {id_user}})

      return response.status(200).send(readAdvertisingsUser)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  static async readAdvertisingsByCategory(request, response){
    const {id_category} = request.params
    try{
      const readAdvertisingsByCategory = await advertisings.findAll({include:[
        {model: images_advertisings},
        {model: categorys}], 
        where: {id_category}})

      return response.status(200).send(readAdvertisingsByCategory)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  
  static async updateAdvertising(request, response){
    const {id} = request.params
    const {id_category, title, description, value} = request.body


    try{
      const updateAdvertising = await advertisings.update({
        id_category,
        title,
        description,
        value
      }, {where: {id}})

      if(request.files.length > 0){
        const parsedImages = request.files.map((image)=>{
          return{
            id_advertising: id,
            image: `http://192.168.1.48:8080/uploads/${image.filename}`
          }
        })
  
        const deleteImages = await images_advertisings.destroy({where: {id_advertising: id}})
        const insertImagesOfAdvertising = await images_advertisings.bulkCreate(parsedImages)
      }
      

      return response.status(200).send({msg: 'Anuncio atualizado'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  static async deleteAdvertising(request, response){
    const {id} = request.params
    try{
      const deleteAdvertising = await advertisings.destroy({where: {id}})
      return response.status(200).send({msg: 'Anuncio deletado'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }  
}


module.exports= AdvertisingControllers