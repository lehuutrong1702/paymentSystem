
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import wallet from '../model/wallet.js';
import transaction from '../model/transaction.js';
import util from '../utils/util.js';
const secret = process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;
dotenv.config();
const adminController = {
    loadMoney: async (req, res) => {
        const field = req.body;
        const id = req.params.id;
        const w = await wallet.getByID(id);
        var newStr = Number(w.balance.replace(/[^0-9.-]+/g, ""));
        console.log(newStr);
        w.balance = parseInt(newStr) + parseInt(field.balance);
        wallet.updateBalance(w);
        res.json(w);
    },
    adminAuthen: function adminAuthen(req, res, next) {
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.split(' ')[1];
        if (!token)
            return res.sendStatus(401);
        jwt.verify(token, secret, (err, data) => {
            console.log(data);
            if (err) return res.sendStatus(403);
            //if (data.role != 'admin') return res.sendStatus(401);
        })
        next();
    },
    getAllTransaction: async (req, res, next) => {
        const start = req.query.start;
        const end = req.query.end;
        console.log(start);
        let transactions = await transaction.getByWalletId('admin');
        transactions = await transaction.filterByTime(transactions, start, end);
        console.log(transactions)
        res.json(transactions);
    }
}


export default adminController;