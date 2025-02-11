const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Menu = require("../models/menu");

//get
router.get('', async (req, res) => {
    try {
        const response = await Menu.find();
        res.status(200).json(response);
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//post
router.post('', async (req, res) => {
    try {
        const data = req.body;
        const menu = new Menu(data);

        const response = await menu.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//parameterized get
router.get('/:taste', async (req, res) => {
    const tasteType = req.params.taste;
    if (tasteType === 'spicy' || tasteType === 'sweet' || tasteType === 'sour') {
        try {
            const response = await Menu.find({ taste: tasteType });
            res.status(200).json(response);
        } catch (err) {
            console.error('Error details:', err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ error: "Invalid taste type" });
    }
});

module.exports = router;