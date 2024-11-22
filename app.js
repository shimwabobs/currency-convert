const http=require("http");
const express=require("express");
const logger=require("morgan");
const bodyParser = require("body-parser");
bodyParser

const host="localhost";
const port=4560;
const app=express();
const server=http.createServer(app);
const exchangeRates = {
    USD: { EUR: 0.85, RWF: 1200 },
    EUR: { USD: 1.18, RWF: 1400 },
    RWF: { USD: 0.00083, EUR: 0.00071 },
};

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/currency-convert",(req,res)=>{
    const amount=req.body.amount;
    const fromCurrency=req.body.fromCurrency;
    const toCurrency=req.body.toCurrency;
    if(isNaN(amount)||!exchangeRates.hasOwnProperty(fromCurrency)||!exchangeRates[fromCurrency].hasOwnProperty(toCurrency)){
        res.status(400).json({
            message:"Error use number and standard curency abbreviation"
        })
    }else{
        const convertrate=exchangeRates[fromCurrency][toCurrency];
        const afterConvert=convertrate*amount;
        res.status(200).json({
            message:"Conversion Successful",
            beforeConversion:"Amount",
            afterConversion:afterConvert
        })
    }


})

server.listen(port,host,()=>{
    console.log("No error");
})