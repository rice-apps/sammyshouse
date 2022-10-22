const express = require('express');
const Event = require('../model/event');

const router = express.Router()

module.exports = router;

// Add a new event
router.post('/addEvent', async (req, res) => {
    const data = new Event({
        name: req.body.name,
        photo: req.body.photo,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
        tags: req.body.tags,
        price: req.body.price
    });
    
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all events
router.get('/getAllEvents', async (req, res) => {
    try {
        const data = await Event.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get events by tags
router.get('/getEventsByTags/:tags', async (req, res) => {
    try {
        const data = await Event.find({ tags: req.params.tags });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Get event by ID
router.get('/getEventById/:id', async (req, res) => {
    try{
        const data = await Event.findById(req.params.id);
        res.json(data);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
});

// Get events by name
router.get('/getEventsByName/:name', async (req, res) => {
    try {
        console.log(req)
        const data = await Event.find({ name : req.params.name });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update event by ID
router.patch('/updateEvent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Event.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete event by ID
router.delete('/deleteEvent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Event.findByIdAndDelete(id);
        
        res.send(`Event '${data.name}' has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
