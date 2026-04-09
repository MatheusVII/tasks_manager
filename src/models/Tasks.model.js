import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Tasks = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'users',
            key: 'id'
        }   
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high", "urgent"),
        defaultValue: "medium"
    },
    state: {
        type: DataTypes.ENUM("canceled", "pending", "in_progress", "completed"),
        defaultValue: "pending"
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    state_changed_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    tableName: 'tasks',
    timestamps: true
});