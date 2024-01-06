 //import { TableName } from 'pg-promise';
import db from '../db/db.js';
const tbName = 'wallet';


const v = class wallet {
    constructor(id,balance){
        this.id = id ;
        this.balance = balance;
    };

    static async getByID(proID){
       var wallet = await db.findOne(tbName, 'id', proID);
        return wallet;
    };

    static async updateBalance(wallet){
        
        var wallet = await db.update(tbName, {field:'id', value:(wallet.id)}, wallet)
        console.log(wallet);
       // return wallet;
    };
<<<<<<< HEAD
    static async getAll(page, perPage){
        var wallet = await db.findAll(tbName, page, perPage)
        return wallet;
    } 

    static async deleteWallet(id){
        var wallet = await db.del(tbName, 'id' , id);
        return wallet;
    }
    static async addWallet(wallet){
        var wallet = await db.add(tbName, wallet);
        return wallet;
=======

    static async createWallet(wallet){
        console.log(wallet);
        var wallet = await db.insert(tbName,wallet);
       
>>>>>>> Trong
    }

}
export default v;