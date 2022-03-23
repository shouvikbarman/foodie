import Image from 'next/image';
import {useEffect,useState} from 'react'
import PaytmChecksum from 'paytmchecksum'
import https from 'https';
import axios from 'axios';
import Script from 'next/script'
import {useRouter} from 'next/router'
import { useDispatch,useSelector  } from 'react-redux';
import {reset} from '../redux/cartSlice'
import styles from '../styles/cart.module.css'

const PaytmButton = ({userData}) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const createOrder = async (data) => {
    try {
      const res = await axios.post(process.env.BASE_URL+'api/orders',data);
      res.status === 201 && router.push('/orders/'+ res.data._id);
      dispatch(reset());
    } catch (err) {
      console.error(err);
    }
  }

  const [paymentData, setPaymentData] = useState({
    token: "", 
    order: "", 
    mid: "",
    amount: ""
  });
  const [loading, setLoading] = useState(false);
    useEffect(() => {
        initialize();
      });
    
    const initialize = () => {
    let orderId = "RSGI" + Math.floor(Math.random(6) * 1000000);
    
    // Sandbox Credentials
    const mid = process.env.mid; // Merchant ID
    const mkey = process.env.mkey; // Merchant Key
    var paytmParams = {};
    
    paytmParams.body = {
        requestType: "Payment",
        mid: mid,
        websiteName: "WEBSTAGING",
        orderId: orderId,
        callbackUrl: "",
        txnAmount: {
        value: cart.total,
        currency: "INR",
        },
        userInfo: {
        custId: userData._id,
        },
    };
    
    PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        mkey
    ).then(function (checksum) {
        paytmParams.head = {
        signature: checksum,
        };
    
        var post_data = JSON.stringify(paytmParams);
    
        var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in" /* for Production */,
    
        // hostname: "securegw.paytm.in",
    
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
        },
        };
    
        var response = "";
        var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
            response += chunk;
        });
        post_res.on("end", function () {
            // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
            setPaymentData({
            ...paymentData,
            token: JSON.parse(response).body.txnToken,
            order: orderId,
            mid: mid,
            amount: cart.total,
            });
        });
        });
    
        post_req.write(post_data);
        post_req.end();
    });
    };

    const makePayment = () => {
        setLoading(true);
        var config = {
            "root":'',
            "style": {
              "bodyBackgroundColor": "#fafafb",
              "bodyColor": "",
              "themeBackgroundColor": "#0FB8C9",
              "themeColor": "#ffffff",
              "headerBackgroundColor": "#284055",
              "headerColor": "#ffffff",
              "errorColor": "",
              "successColor": "",
              "card": {
                "padding": "",
                "backgroundColor": ""
              }
            },
            "data": {
              "orderId": paymentData.order,
              "token": paymentData.token,
              "tokenType": "TXN_TOKEN",
              "amount": paymentData.amount /* update amount */
            },
            "payMode": {
              "labels": {},
              "filter": {
                "exclude": []
              },
              "order": [
                  "UPI",
                  "CC",
                  "DC",
                  "NB",
                  "PPBL",
                  "PPI",
                  "BALANCE"
              ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
              "mid": paymentData.mid,
              "redirect": false
            },
            "handler": {
              "transactionStatus":
                function transactionStatus(paymentStatus){
                let {RESPCODE} = paymentStatus;
                if (RESPCODE === '01'){
                  createOrder({
                    customer: userData.name,
                    address: userData.address,
                    total: paymentData.amount,
                    method: 1
                  })
                }
              },
              "notifyMerchant":
                function notifyMerchant(eventName,data){
              }
            }
        };


        if (window.Paytm && window.Paytm.CheckoutJS) {
          window.Paytm.CheckoutJS.init(config).
          then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error) {
              console.log("Error => ", error);
              });
        }}	
    
    return (
        <>
          {loading ? (
            <Image src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="Loading" width="50" height="50"/>
          ) : (
            <button onClick={makePayment} className={styles.paytmButton}>Pay Now</button>
          )}
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
          <Script type=' text/javascript' crossorigin='anonymous' src='https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/pkOjSQ63348810371031.js'></Script>
        </>
      );
     
}

export default PaytmButton;