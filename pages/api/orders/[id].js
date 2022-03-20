import dbConnect from '../../../lib/dbConnect'
import Order from '../../../models/order'

export default async function handler(req, res) {
    await dbConnect()
    const {method, query:{id}} = req;

    if (method === 'GET') {
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
        
    }
    if (method === 'PUT') {
        try {
            await Order.findByIdAndUpdate(id,req.body);
            const order = await Order.find().sort({createdAt:-1});
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === 'DELETE') {}
}