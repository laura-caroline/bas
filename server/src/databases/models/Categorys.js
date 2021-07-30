module.exports = (sequelize, DataTypes)=>{
  const categorys = sequelize.define('categorys', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  })

  categorys.associate = (models)=>{
    categorys.hasMany(models.advertisings, { foreignKey: 'id_category'})
  }

  return categorys
}