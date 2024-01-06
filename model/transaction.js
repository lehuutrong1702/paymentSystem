import db from '../db/db.js';
const tbName = 'transaction';


const t = class transaction {
    constructor(walletId,date,money){
        this.walletId = walletId;
        this.date = date;
        this.money= money;
    };

    static async getByID(proID){
       var transaction = await db.findOne(tbName, 'id', proID);
        return transaction;
    };

    static async createTransaction(transaction){
        console.log(transaction);
        var wallet = await db.insert(tbName,transaction);
    }
    static async getByWalletId(walletId,page=1,perPage=10){
        var transaction  = await db.findByField(tbName,"wallet_id",walletId,page,perPage);
        return transaction ; 
    }
    static async getByTime(start,end,page=1,perPage=10){
        var transaction  = await db.findByField(tbName,"date",start,end,page,perPage);
        return transaction ; 
    }
    static async filterByTime(transactions,start,end){
        var result = transactions.filter(function(transaction) {
            return (transaction.date >= start && transaction.date < end)
          });
        return result;
    }

}
export default t;