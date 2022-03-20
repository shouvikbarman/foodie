import dbConnect from '../../../lib/dbConnect'
import Order from '../../../models/order'

export default async function handler(req, res) {
    await dbConnect()
    const {method} = req;

    if (method === 'GET') {
        try{
            const orders = await Order.find().sort({createdAt:-1});
            res.status(200).json(orders);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if (method === 'POST') {
        try{
            const order = await Order.create(req.body);
            res.status(201).json(order);
        }catch(err){
            res.status(500).json(err);
        }
    }
}