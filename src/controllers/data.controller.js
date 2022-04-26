const express = require("express");
const Address = require("../model/address.model");
const Resident = require("../model/data.model");

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const data = await Resident.findOne({addressId : req.body.addressId}).lean().exec();
    if(data){
      return res.status(300).json({message : "user already added the data"});
    }
    const playlist = await Resident.create(req.body);
    return res.status(200).json(playlist);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});
router.get('/all', async (req, res) => {
  try {
    const residentData = await Resident.find()
    .populate({path : 'addressId'})
    .lean()
    .exec();
    return res.status(200).json(residentData);
  }
  catch(err) {
    return res.status(400).json(err.message);
    
  }
})
router.get("/:id", async (req, res) => {
  try {
    const flatID = req.params.id;
    const address = await Address.findOne({userId: flatID}).select({city : 1, capacity : 1, rating : 1, houseUrl : 1}).lean().exec();
    const userPlaylist = await Resident.findOne({addressId : flatID}).populate([{path : 'addressId', select : ["firstName", "lastName", "type"]}]).select({flatId : 0}).lean().exec();
    const final = {...address, ...userPlaylist}

    return res.status(200).json(final);

  } catch (err) {
    return res.status(400).json(err.message);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();
    return res.status(200).json(resident);
  }
  catch(err) {
    return res.status(400).json(err.message)
  }
})
module.exports = router;
