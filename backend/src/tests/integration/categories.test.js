const {User} = require('../../models/user')
const {Categories} = require('../../models/categories')

const request =require('supertest')


let server;

describe('/api/categories', ()=>{
    beforeEach(()=>{ server = require('../../server'); });
    afterEach( async() => {
        server.close(); 
        await Categories.deleteMany({});
     })


describe('GET / All', ()=>{
    it('should retrun all cat', async()=>{
        await Categories.collection.insertMany([
            { name:'catt1' },
            { name:'catt2' },
        ])

       const res = await request(server).get('/api/categories/All');

       expect(res.status).toBe(200);
       expect(res.body.length).toBe(2);
       expect(res.body.some(c=> c.name === 'catt1')).toBeTruthy()
       expect(res.body.some(c=> c.name === 'catt2')).toBeTruthy()

    })
});

describe('GET /:ID', ()=>{
    it('should Retrun a cat if valid id is passed', async()=>{
        const cat = new Categories({ name:'catt1' });
        await cat.save();

        const res = await request(server)
        .get('/api/categories/' + cat._id);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', cat.name)

    })

    it('should return 404 if invlid id is passed', async ()=>{  
        const res = await request(server).get('/api/categories/1');
  
        expect(res.status).toBe(404);
      });
});

describe('POST/', ()=>{
    it('should return 401 if client is not logged in', async()=>{
        const res = await request(server)
         .post('/api/categories')
         .send({ name:'catt1' })
         
         expect(res.status).toBe(401)
    })

    it('should return 403 if user role not an ADMIN', async()=>{
      const token =  new User().generateAuthToken();
      const res = await request(server)
      .post('/api/categories')
      .set('x-auth-token', token)
      .send({ name:'catt1' })
     
      expect(res.status).toBe(403)
    })

    
    it('should return 400 if cat name is less than 5 characters', async()=>{
        const token =  new User({isAdmin:true}).generateAuthToken();
       
        const res = await request(server)
        .post('/api/categories')
        .set('x-auth-token', token)
        .send({ name:'123' })
       
        expect(res.status).toBe(400)
    })
     

    it('should return 400 if cat name is more than 50 characters', async()=>{
        const token =  new User({isAdmin:true}).generateAuthToken();
        const name = new Array(55).join('z');

        const res = await request(server)
        .post('/api/categories')
        .set('x-auth-token', token)
        .send({ name:name })
       
        expect(res.status).toBe(400)
    })
     
    it('should save the cat if it is valid', async()=>{
        const token =  new User({isAdmin:true}).generateAuthToken();

         await request(server)
        .post('/api/categories')
        .set('x-auth-token', token)
        .send({ name:'Ncatt1' })

        const cat = await Categories.find({ name:'Ncatt1' })

        expect(cat).not.toBeNull();

    })

         
    it('should return the cat if it is valid', async()=>{
        const token =  new User({isAdmin:true}).generateAuthToken();

        const res = await request(server)
        .post('/api/categories')
        .set('x-auth-token', token)
        .send({ name:'Ncatt1' })
        
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'Ncatt1')

    })
    

})
});





