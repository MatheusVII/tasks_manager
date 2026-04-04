import sequelize from '../config/database.js';

import { Users } from './Users.model.js';
import { Tasks } from './Tasks.model.js';

Users.hasMany(Tasks, {
    foreignKey: 'user_id'
})

Tasks.belongsTo(Users, {
    foreignKey: 'user_id'
})

export { Users, Tasks, sequelize };