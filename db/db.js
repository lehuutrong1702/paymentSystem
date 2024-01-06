import dotenv from 'dotenv'; 

dotenv.config();
import pg from 'pg-promise';

const pgp = pg ({
    capSQL: true
})

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

const db = pgp(cn);
const database = { 
    findByField: async (tbName, fieldName, value,page,perPage) => {
        let con = null;
        try{
            con = await db.connect();
            const rs = await con.manyOrNone(`SELECT * FROM "${tbName}" WHERE "${fieldName}" = '${value}'
             LIMIT ${perPage} OFFSET ${(page-1)*perPage} `);
            
            return rs;
        }catch(error){
            throw error;
        }finally{
            if(con){
                con.done();
            }
        }
    },
    findByRange: async (tbName,fieldName,start,end,page,perPage) =>{
        let con = null;
        try{
            con = await db.connect();
            const rs = await con.manyOrNone(`SELECT * FROM "${tbName}" WHERE "${fieldName}" >= ${start} 
            AND "${fieldName}" < ${end}
            LIMIT ${perPage} OFFSET ${(page-1)*perPage} `);
            return rs;
        }catch(error){
            throw error;
        }finally{
            if(con){
                con.done();
            }
        }
    },

    findOne: async (tbName, fieldName, value) => {
        let con = null;
        try{
            con = await db.connect();
            const rs = await con.oneOrNone(`SELECT * FROM "${tbName}" WHERE "${fieldName}" = $1`, [value]);
            return rs;
        }catch(error){
            throw error; 
        }finally{
            if(con){
                con.done();
            }
        }
    },  
    update: async (tbName, condition, obj) => {
        let con = null;
        try {
            con = await db.connect();
            let sql = pgp.helpers.update(obj,null, tbName) + ` WHERE "${condition.field}" = '${condition.value}'`;
            console.log(sql);
            const rs = await con.none(sql);
            return rs;
        } catch (error){
            throw error;
        } finally {
            if(con){
                con.done();
            }
        }
    },
<<<<<<< HEAD
    findAll: async (tbName,page,perPage) => {
        let con = null;
        try{
            console.log(tbName, page, perPage);
            con= await db.connect();
            const rs = await con.any(`SELECT * FROM "${tbName}" LIMIT ${perPage} OFFSET ${(page-1)*perPage}`);
            return rs;
        }catch(error){
            throw error;
        } finally{
            if(con){
                con.done();
            }
        }
    },
    add: async (tbName, obj)=>{
        let con = null;
        try{
            con = await db.connect();
            console.log(obj);
            let sql = pgp.helpers.insert(obj, null, tbName);
            console.log(sql);
            await con.none(sql);
        }catch(error){
            throw error;
        }finally{
            if(con){
                con.done();
            }
        }
    },
    del: async (tbName, fieldName, value) => {
        let con = null;
        try {
            con = await db.connect();
            let sql = `DELETE FROM "${tbName}" WHERE "${fieldName}" = $1`;
            await con.none(sql, [String(value)]);
=======
    insert: async(tbName, obj) => {
        let con = null;
        try {
            con = await db.connect();
            let sql = pgp.helpers.insert(obj,null, tbName);
            const rs = await con.none(sql);
            return rs;
>>>>>>> Trong
        } catch (error){
            throw error;
        } finally {
            if(con){
                con.done();
            }
        }
<<<<<<< HEAD
    }
=======
    },
>>>>>>> Trong
}


export default database;