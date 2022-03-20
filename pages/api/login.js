import cookie from 'cookie'

const handler = (req, res) => {
    const {method} = req;

    if (method === 'POST') {
        const {username,password} = req.body;
        if (username === process.env.ADMIN_USERNAME && password === process.env.PASSWORD) {
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token',process.env.TOKEN,{
                    maxAge: 60*60*24*7,
                    sameSite: 'strict',
                    path: '/',

                }))
            res.status(200).json('Successful');
        }else {
            res.status(400).json('Wrong Credentials');
        };
    }
};

export default handler;