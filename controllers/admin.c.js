
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
      
<<<<<<< HEAD
        // const token = authorizationHeader.split(' ')[1];
        // if (!token) res.sendStatus(401);
        // jwt.verify(token,secret,(err,data)=>{
        //    console.log(err,data);
        //    if(err) res.sendStatus(403);
        //   if(data.role != 'admin') res.sendStatus(401); 
        //    next();
        // })
    },
    listUser: async(req, res, next) => {
        try {
            const rs = await wallet.getAll(req.query.page, req.query.perPage);
            return res.render('listUser', {listUser: rs,
                title: 'List Users'
            })
        } catch (error) {
            next(error)
        }
    },
    addUser: async(req, res, next) => {
        try {
            const id = req.body.idUser;
            const balance = req.body.balanceUser;
            console.log(id, balance);
            const rs1 = await wallet.addWallet(new wallet(id, balance));
            const rs = await wallet.getAll(1, null);
            return res.render('listUser', {listUser: rs,
                title: 'List Users'
            })
        } catch (error) {
            next(error)
        }
    },
    updateUser: async(req, res, next) => {
        try {
            const id = req.params.id;
            const balance = req.body.balanceUser;
            console.log(id, balance);
            await wallet.updateBalance(new wallet(id, balance));
            const rs = await wallet.getAll(1, null);
            return res.render('listUser', {listUser: rs,
                title: 'List Users'
            })
        } catch (error) {
            next(error)
        }
    }, 
    deleteUser: async(req, res, next) => {
        try {
            const id = req.params.id;
            const rs = await wallet.deleteWallet(id);
            const rs1 = await wallet.getAll(1, null);
            return res.render('listUser', {listUser: rs1,
                title: 'List Users'
            })
        } catch (error) {
            next(error)
        }
    }   
=======
        const token = authorizationHeader.split(' ')[1];
        if (!token) res.sendStatus(401);
        jwt.verify(token,secret,(err,data)=>{
           console.log(err,data);
           if(err) res.sendStatus(403);
          if(data.role != 'admin') res.sendStatus(401); 
           next();
        })
      },
    getAllTransaction: async (req,res,next) =>{
        const start = req.query.start;
        const end = req.query.end;
        console.log(start);
        var transactions = await transaction.getByWalletId('admin');
        transactions =await transaction.filterByTime(transactions,start,end);
        res.json(transactions);
    }
>>>>>>> Trong
}


export default adminController ;