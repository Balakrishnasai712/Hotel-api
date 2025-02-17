const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const person = new Person(data);

        const response = await person.save();
        console.log('data saved');
        const payload = {
            id: response.id,
            username: response.username
        };
        console.log('Payload:', JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Generated token: ', token);

        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//login 
router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const person = await Person.findOne({username: data.username});

        if(!person || !await person.comparePassword(data.password)) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        const payload = {
            id: person.id,
            username: person.username
        }
        const token = generateToken(payload);
        res.status(200).json({token: token});
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error "});
    }
});
//get profile through token
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const person = await Person.findById(userData.id);
        console.log('Person:', person);
        res.status(200).json(person);
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//get
router.get('', jwtAuthMiddleware, async (req, res) => {
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