const ReviewSchema = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize
    const { INTEGER, STRING, DATEONLY } = DataTypes

    const Review = sequelize.define('review', {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        hotel_id: {
            type: INTEGER,
        },
        score: {
            type: INTEGER,
        },
        comment: {
            type: STRING,
        },
        created_date: {
            type: DATEONLY
        }
    }, {
        underscored: true
      });


    return { Review }

}

export default ReviewSchema;