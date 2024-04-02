const express = require('express');
const router = express.Router()
const Order = require('../models/Orders')
require('dotenv').config();
const stripe = require("stripe")("sk_test_51P162zSD2ABbztaQLcQsxeMccEx5mwr60GLywB4HbopGPFAAPFPk5dbgcAxjQvknBYTzCezfd0ubQTluNtvonDze00yGHaM48M")

router.post('/checkout', async (req, res) => {
    const data = req.body.order_data
    // console.log(data)

    const lineItems = data.map((product) =>({
        price_data :{
            currency: "inr",
            product_data:{
                name: product.name
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://foodapp-frontend-nine.vercel.app/success",
        cancel_url: "https://foodapp-frontend-nine.vercel.app/cancel",
    });

    res.json({id: session.id})

 
})


module.exports = router;