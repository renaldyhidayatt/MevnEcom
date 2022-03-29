const {ML_Result, validata} = require('../models/ml/ml_result');
const {ML_Cart} = require('../models/ml/ml_cartitems');
const {ML_Products } = require('../models/ml/ml_selected_products');
const {Products} = require('../models/products')
const {UserSearchs} = require('../models/search')

const auth = require('../middleware/auth');
const brain = require('brain.js');
const express = require('express');

const router = express.Router();


router.get('/All', auth, async (req, res) => { // get all prod that may user like  
    let userID = req.user._id;
    BigData = [];
    const MLres = await ML_Result.find({
        UserID_ML_Result:userID
    })
    .populate('Selected_ML_Result')
    .select(['-_id','-UserID_ML_Result']) // get only the prodcts 
    //.select(['-_id']); // get only the prodcts id
    
    for (let index = 0; index < MLres.length; index++) {
      const element = MLres[index];
     // console.log('data', element['Selected_ML_Result']);
      let ifdata = BigData.find(x => x._id === element['Selected_ML_Result']._id);
      if(!ifdata){
        BigData.push(element['Selected_ML_Result']);
      }
      // console.log('if data', ifdata)
      // console.log('dd,', BigData)
    }
    
    //console.log('dd,', BigData)
    res.send(BigData);
  });
  

module.exports = router;











