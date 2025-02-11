const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('', async (req, res) => {
    try {
        const data = req.body;
        const person = new Person(data);

        const response = await person.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//get
router.get('', async (req, res) => {
    try {
        const response = await Person.find();
        res.status(200).json(response);
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Parameterized API calls
router.get('/:work', async (req, res) => {
    const workType = req.params.work;
    if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
        try {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        } catch (err) {
            console.error('Error details:', err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ error: "Invalid work type" });
    }
});

//put 
router.put('/:id', async (req, res)=> {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json(response);
    }
    catch(err){
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete
router.delete('/:id', async (req, res)=> {
    try {
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json(response);
    }
    catch(err){
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;