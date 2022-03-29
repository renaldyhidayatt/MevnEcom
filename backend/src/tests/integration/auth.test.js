const {User} = require('../../models/user')
const {Categories} = require('../../models/categories')

const request =require('supertest')
// const server = require('../../index')

describe('auth middleware', ()=>{

    beforeEach(()=>{ server = require('../../server'); })

    afterEach( async () =>{
        await Categories.remove({});
        server.close();
    })


    let token;

    const exec = () =>{
        return request(server)
         .post('/api/categories')
         .set('x-auth-token', token)
         .send({ name:'newCATTest' })
    }

    beforeEach(()=>{
        token = new User({ isAdmin:true }).generateAuthToken();
    })


    it('should retrun 401 if no token is provided' , async ()=>{
        token = '';

        const res = await exec();

        expect(res.status).toBe(401)

    })

    it('should retrun 400 if  token is invalid' , async ()=>{
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400)

    })

    it('should retrun 200 if token is valid and user is Admin ' ,async ()=>{
        const res = await exec();
        
        expect(res.status).toBe(200) // success
    })

})


