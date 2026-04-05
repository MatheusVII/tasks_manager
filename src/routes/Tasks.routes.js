import express from 'express';
import { sequelize, Tasks } from '../models/index.js'
import {Sequelize, Op } from 'sequelize';

const router = express.Router();

router.get('/tasks/search', async (req, res) => {
    let { limit, page, priority, priorityOrder, date, match, state } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    let where = {};
    let queryParams = {};

    if(priorityOrder){
        if(priorityOrder === "asc"){
            queryParams.order = [['priority', 'ASC']];
        } else{
            queryParams.order = [['priority', 'DESC']];
        }
    }

    if(priority){
        where.priority = { [Op.in] : priority };
    }

    if(match){
        where[Op.or] = [
            { title: { [Op.iLike] : `%${match}%` } },
            { description: { [Op.iLike] : `%${match}%` } }
        ]
    }

    if(date){
        where[Op.and] = [
            sequelize.where(sequelize.fn('DATE', sequelize.col('dueDate')), date)
        ]
    }

    if(state){
        where.state = { [Op.in] : state }
    }

    queryParams.query = where;

    const response = await Tasks.findAll(queryParams);

    return res.status(200).json({data: response});
});

router.post('/tasks', async (req, res) => {
    
})

export default router;