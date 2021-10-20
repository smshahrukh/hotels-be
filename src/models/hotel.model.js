
const HotelSchema = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize
    const { INTEGER, STRING } = DataTypes
  
    const Hotel = sequelize.define('hotel', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false,
        unique: true
      }
    });


    return { Hotel }
  
  }
  
  export default HotelSchema;