const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

events.get('/', async (req, res) => {
    try {
        const foundEvents = Event.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).json(err)
    }
})

events.get('/:id', async (req, res) => {
    try {
        const foundEvents = Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).json(err)
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = Event.create(req.body)
        res.status(200).json({
            message: 'Successfully created new Event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = events