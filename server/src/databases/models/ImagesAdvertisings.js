module.exports = (sequelize, DataTypes)=>{
  const images_advertisings = sequelize.define('images_advertisings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_advertising: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'advertisings', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  })

  images_advertisings.associate = (models)=>{
    images_advertisings.belongsTo(models.advertisings, { foreignKey: 'id_advertising'})
  }

  return images_advertisings
}