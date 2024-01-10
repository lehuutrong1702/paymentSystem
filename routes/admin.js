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
r.patch('/:id',adminController.adminAuthen,adminController.loadMoney);
r.get('/transactions',adminController.adminAuthen,adminController.getAllTransaction);
export default r ;