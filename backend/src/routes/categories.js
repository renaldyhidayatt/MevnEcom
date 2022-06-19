const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Categories, validate} = require('../models/categories')
const ValidObjectId = require('../middleware/validObjectid');
const express = require('express');
const validObjectid = require('../middleware/validObjectid');
const router = express.Router();



router.post('/', [auth, admin], async(req, res) => {
    const {error} = validate(req, res)
    if(error) return res.status(400).send(error.details[0].message)

    let cat = new Categories({ name: req.body.name})

    cat = await cat.save()

    return res.status(200).send(cat);
})

router.get("/All", async(req, res) => {
    const Cat = await Categories.find();
    return res.send(Cat)
})

router.get("/:id", validObjectid, async(req, res) => {
    const cat = await Categories.findById(req.params.id);

    if(!cat) return res.status(404).send('The Cat with the given ID was not found.');

    res.send(cat);
})

router.get("/CatByPage/:Page", async(req, res) => {
    const pageNumber = req.params.Page;
    const pageSize = 2;
    const Cat = await Categories
    .find()
    .skip((pageNumber -1) * pageSize)
    .limit(pageSize);

    res.send(Cat)
})


router.put("/:id", [auth, admin], async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const cat = await Categories.findByIdAndUpdate(req.params.id,
        {name:req.body.name},
        {new:true, useFindAndModify: false});
    
    if (!cat) return res.status(404).send("the cat with the given Id was not found.");
    
    res.send(cat);
})

router.delete('/:id', [auth, admin], async(req, res) => {
    const cat = await Categories.findByIdAndRemove(req.params.id,
        {useFindAndModify: false});
    
    if(!cat) return res.status(404).send("the cat with the given Id was not found.");
   
    res.send(cat);
})

module.exports = router;