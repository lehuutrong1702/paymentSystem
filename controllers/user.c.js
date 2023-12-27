
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import wallet from '../model/wallet.js';
const secret= process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;
dotenv.config();
const userC = {
 
    authenToken: function authenToken(req,res,next) {
        const authorizationHeader = req.headers['authorization'];
      
        const token = authorizationHeader.split(' ')[1];
        if (!token) res.sendStatus(401);
        jwt.verify(token,secret,(err,data)=>{
           console.log(err,data);
           if(err) res.sendStatus(403);
          if(data.id != req.params.id) res.sendStatus(401); 
           next();
        })
      },
      
    
     payment: async function  payment(req,res) {
      try{  
        const field = req.body;
        console.log(field);
        const w =  await wallet.getByID(req.params.id);
        var newStr = Number(w.balance.replace(/[^0-9.-]+/g,""));
        console.log(newStr);
        w.balance = parseInt (newStr) + parseInt(field.balance);
        console.log(w);
        await wallet.updateBalance(w);
        const admin =    await wallet.getByID('admin');
        var newStr = Number(admin.balance.replace(/[^0-9.-]+/g,""));
        console.log(newStr);
        admin.balance = parseInt (newStr) - parseInt(field.balance);
        await wallet.updateBalance(admin);
        res.json(w);
        res.status(200);
      }
        catch(err){
          console.log(err);
          res.status(404);
          res.json("not found id")
        }     
      }
      
}

export default userC;