import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/product'

export default async function handler(req, res) {
    const {method} = req;

    dbConnect()

    if(method === 'GET') {
        try{
            const products = await Product.find();
            res.status(200).json(products);
        }catch(err) {
            console.log(err);
            res.status(404).json(err)
        }
    }
    else if(method === 'POST'){
        try {
            const product = await Product.create(req.body);
            res.status(201).json('New product created successfully')
        }catch(err) {
            res.status(500).json(err);
        }
    }
  }