const express = require('express');
const router = express.Router();
const Pet = require('../model/pet.model');
router.get('/all', async(req,res)=>{
    try {
        const data = await Pet.find().lean().exec();
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(500).json(err);
    }
})
router.post('/post', async(req,res)=>{
    try {
        const pet = await Pet.create(req.body);
        return res.status(200).json(pet);
    }
    catch (err) {
        return res.status(500).json(err);
    }
})
module.exports = router;