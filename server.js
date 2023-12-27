import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import https from 'https';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
let refreshTokens = []; // database 
//view engine
import {create} from 'express-handlebars'
const hbs = create({
  extname: '.hbs'
})
app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const secret= process.env.ACCESS_TOKEN_SECRET;
const refresh = process.env.REFRESH_TOKEN_SECRET;
console.log(secret);
console.log(refresh);

// function authenToken(req,res,next) {
//     const authorizationHeader = req.headers['authorization'];
//     console.log(authorizationHeader);
//     // beaer [token]
//     const token = authorizationHeader.split(' ')[1];
//     // 
//     if (!token) res.sendStatus(401);
//     jwt.verify(token,secret,(err,data)=>{
//        console.log(err,data);
//        if(err) res.sendStatus(403);
//        // data : { id: 'id1234', iat: 1702722293, exp: 1702722353 }
//        // Kiem tra id trong token (data) voi id trong req 
//        next();
//     })
// }

// app.post('/refreshToken',(req,res)=>{
//     const refreshToken = req.body.token;
//     if(!refreshToken) req.sendStatus(401);
//     if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
//     jwt.verify(refreshToken,refresh,(err,data)=>{
//         console.log(err,data) ; 
//         if(err) res.sendStatus(403);
//         const accessToken = jwt.sign({id: data.id},secret,{expiresIn:'60s'});
//         res.json({accessToken});
//     })
// });




import r from './routes/index.js';
import admin from './routes/admin.js';
app.use('/',r);
app.use('/admin',admin);
app.get('/',(req,res)=>{
    res.json("hello world");
})


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))

},app)

sslServer.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
})