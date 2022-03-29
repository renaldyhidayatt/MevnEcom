const {User} = require('../../../models/user')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAthToken', ()=>{
    it('should retru a valid jwt', ()=>{
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin:true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        expect(decoded).toMatchObject(payload)
    })
})


