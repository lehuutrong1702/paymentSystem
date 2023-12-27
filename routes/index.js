import express from 'express';
const r = express.Router();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import wallet from '../model/wallet.js';

import userController from '../controllers/user.c.js'
import adminController from '../controllers/admin.c.js';
dotenv.config();
const secret= process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;



let refreshTokens = []; // database 



r.post('/refreshToken',(req,res)=>{
  const refreshToken = req.body.token;
  if(!refreshToken) req.sendStatus(401);
  jwt.verify(refreshToken,refresh,(err,data)=>{
      console.log(err,data) ; 
      if(err) res.sendStatus(403);
       const accessToken = jwt.sign({id: data.id},secret,{expiresIn:'60s'});
      console.log(accessToken);
      res.json({accessToken});
  })
});

r.patch('/info/:id' , userController.payment)

 
//r.get('/admin',adminController.adminAuthen, adminController.listUser)

// r.get('/admin',adminController.adminAuthen,async(req,res)=>{
//     const 
//     const data= req.body;
//     console.log(data);
//     res.json(data);
// })


r.get('/info/:id',userController.authenToken,async (req,res)=>{
  console.log(req.params.id);

  const rs =  await wallet.getByID(req.params.id);
  res.json(rs);
})

r.route('/login').post((req,res) =>{
 
    const data = req.body ;
    const accessToken =  jwt.sign(data,secret,{expiresIn:'60s'}); // parse

    const refreshToken = jwt.sign(data,refresh);

    res.json({accessToken,refreshToken});
}
)
export default r ;