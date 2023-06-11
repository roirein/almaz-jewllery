import axios from 'axios'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {action, ...body} = req.body
        let response
        switch(action){
            case 'newOrder': 
                response = await axios.post(`${process.env.SERVER_URL}/order/newOrder`, body, {
                    headers: {
                        'Authorization': req.header('Authorization')
                    }
                });
                break;
            default: 
                response = null;
        }
        res.status(response.status).send(response.data)
    }
}

export default handler;