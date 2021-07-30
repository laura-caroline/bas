module.exports = (sequelize, DataTypes)=>{
  const advertisings = sequelize.define('advertisings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    id_category: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'categorys', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    value: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    created: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE
    }
  },{
    timestamps: false
  })

  advertisings.associate = (models)=>{
    advertisings.belongsTo(models.users, { foreignKey: 'id_user'})
    advertisings.belongsTo(models.categorys, { foreignKey: 'id_category'})
    advertisings.hasMany(models.images_advertisings, {foreignKey: 'id_advertising'})

  }

  return advertisings
}