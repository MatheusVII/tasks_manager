import express from 'express';
import { Tasks } from '../models/index.js'
import {Sequelize, Op } from 'sequelize';

const router = express.Router();

router.get('/tasks/search', async (req, res) => {
    try{
        let { limit, page, priority, priorityOrder, date, match, state } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);

        let where = {};
        let queryParams = {};
        let priorities = [];

        if(priorityOrder){
            if(priorityOrder === "asc"){
                queryParams.order = [['priority', 'ASC']];
            } else{
                queryParams.order = [['priority', 'DESC']];
            }
        }

        if(priority){
            priorities = priority.split(',')
            where.priority = { [Op.in] : priorities };
        }

        if(match){
            where[Op.or] = [
                { title: { [Op.iLike] : `%${match}%` } },
                { description: { [Op.iLike] : `%${match}%` } }
            ]
        }

        if(date){
            where[Op.or] = [
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col('dueDate')), date),
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col('createdAt')), date)
            ]
        }

        if(state){
            where.state = { [Op.in] : [state] }
        }

        queryParams.where = where;

        const response = await Tasks.findAll(queryParams);

        return res.status(200).json({data: response}); 
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

});

router.post('/tasks', async (req, res) => {
    try{
        const { title, priority, dueDate, description } = req.body;

        if(!title || !priority || !dueDate || !description){
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        const created = await Tasks.create({
            user_id: 1,
            title: title,
            priority: priority,
            dueDate: dueDate,
            description: description,
            state: "pending"
        })

        if(created){
            return res.status(201).json({message: "Tarefa criada!"});
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
})

router.put('/tasks/state/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { state } = req.body;

        await Tasks.update({
            state: state
        }, {
            where: {
                id: id
            }
        });

        return res.status(204).json();
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
})

export default router;