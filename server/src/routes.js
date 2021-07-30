const express = require('express')
const AdvertisingControllers = require('./controllers/AdvertisingsControllers')
const UsersControllers = require('./controllers/UsersControllers')
const authMiddleware = require('./middlewares/auth')
const multer = require('multer')
const multerConfig = require('./services/multer');
const CategorysControllers = require('./controllers/CategorysControllers')
const upload = multer({storage: multerConfig})
const route = express.Router()

console.log(authMiddleware)


route.post('/advertisings/:id_user', upload.array('images', 4), authMiddleware, AdvertisingControllers.insertAdvertising)
route.put('/advertisings/:id/', upload.array('images', 4), authMiddleware, AdvertisingControllers.updateAdvertising)
route.delete('/advertisings/:id',authMiddleware, AdvertisingControllers.deleteAdvertising)
route.get('/advertisings', AdvertisingControllers.readAdvertisings)
route.get('/advertisings/category/:id_category', AdvertisingControllers.readAdvertisingsByCategory)
route.get('/advertisings/:id', AdvertisingControllers.readAdvertising)
route.get('/users/advertisings/:id_user', authMiddleware, AdvertisingControllers.readAdvertisingsUser)

route.post('/users', UsersControllers.insertUser)
route.post('/users/auth', UsersControllers.authenticateUser)


route.get('/categorys', CategorysControllers.readCategorys)



module.exports = route