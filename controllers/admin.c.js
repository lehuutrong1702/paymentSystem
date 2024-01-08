
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import wallet from '../model/wallet.js';
import transaction from '../model/transaction.js';
import util from '../utils/util.js';
const secret= process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;
dotenv.config();
const adminController = {
    loadMoney: async (req,res)=>{
        const field= req.body;
        const id = req.params.id;
        const w = await wallet.getByID(id);
        var newStr = Number(w.balance.replace(/[^0-9.-]+/g,""));
        console.log(newStr);
        w.balance = parseInt (newStr) + parseInt(field.balance);
        wallet.updateBalance(w);
        res.json(w);
    },
    adminAuthen:  function adminAuthen(req,res,next) {
        next();
        // const authorizationHeader = req.headers['authorization'];
      
        const token = authorizationHeader.split(' ')[1];
        if (!token) res.sendStatus(401);
        jwt.verify(token,secret,(err,data)=>{
           console.log(err,data);
           if(err) res.sendStatus(403);
          if(data.role != 'admin') res.sendStatus(401); 
           next();
        })
      },
    
}


export default adminController ;