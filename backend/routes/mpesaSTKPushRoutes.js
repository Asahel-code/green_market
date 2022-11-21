import express from 'express';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
// import MpesaPayments from '../models/mpesaPayment.js';
import request from "request";
import accessToken from "../middleware/generateAccessToken.js";
import { isAuth } from '../utils.js';

dotenv.config();

const paymentRouter = express.Router();

paymentRouter.get("/simulate/:phoneNumber/:amount", isAuth, accessToken,expressAsyncHandler(async(req, res) => {
     // get phone number and amount from url params
     const { phoneNumber } = req.params
     const { amount } = req.params
 
 
     let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
     let auth = "Bearer " + req.access_token
 
     // Get current date
     let datenow = new Date();
 
     const timestamp = datenow.getFullYear() + "" + "" + 11 + "" + "" + datenow.getDate() + "" + "" + datenow.getHours() + "" + "" + datenow.getMinutes() + "" + "" + datenow.getSeconds()
     const password = new Buffer.from("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

     request(
         {
             url: url,
             method: "POST",
             headers: {
                 Authorization: auth
             },
             json: {
                 BusinessShortCode: "174379",
                 Password: password,
                 Timestamp: timestamp,
                 TransactionType: "CustomerPayBillOnline",
                 Amount: amount,
                 PartyA: phoneNumber,
                 PartyB: "174379",
                 PhoneNumber: phoneNumber,
                 CallBackURL: `${process.env.MPESA_CALLBACK_URL}/transactionsStatus`,
                 AccountReference: "Fresh Green Market",
                 TransactionDesc: "Fresh Green Market"
             }
         },
         (error, response, body) => {
             if (error) { console.log(error) }
             else { res.status(200).json(body) }
         }
     )
}));

paymentRouter.post("/transactionsStatus", expressAsyncHandler(async(req, res) => {
    console.log(".......................STK............................")
    console.log(req.body.Body.stkCallback.ResultCode);
    if(req.body.Body.stkCallback.ResultCode === 0){
        console.log(req.body.Body.stkCallback.CallbackMetadata.Item)
        res.status(200).json(req.body.Body.stkCallback.CallbackMetadata.Item)
    }
}));


export default paymentRouter;