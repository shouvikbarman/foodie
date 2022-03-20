import User from '../../../models/user'
import dbConnect from '../../../lib/dbConnect'

export default async function handler(req,res) {
    const {method} = req;
    const {phone} = req.query;
    dbConnect();

    if (method === 'GET') {
        try {
            const user = await User.findOne({phone: phone});
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
        }
    }

    else if (method === 'POST') {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
        }
    }
    
}