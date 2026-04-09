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

router.get('/tasks/:id', async (req, res) => {
    try{
        const id = req.params.id;

        const task = await Tasks.findByPk(id);

        if(!task){
            return res.status(404).json({message: "Not found"});
        }

        return res.status(200).json({data: task});
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
})

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
        const { state, state_changed_at } = req.body;

        await Tasks.update({
            state: state,
            state_changed_at: state_changed_at
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

router.put('/tasks/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const { title, priority, description, dueDate } = req.body;

        if(!title || !priority || !description || !dueDate){
            return res.status(400).json({message: "Todos os campos sao obrigatorios"});
        }

        await Tasks.update({
            title: title, 
            description: description,
            priority: priority,
            dueDate: dueDate 
        }, {
            where: {
                id: id
            }
        });

        return res.status(204).json();
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Intrenal server error"});
    }
})

router.delete('/tasks/:id', async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        await Tasks.destroy({
            where: {
                id: id
            }
        })

        return res.status(204).json();
    
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
})

export default router;