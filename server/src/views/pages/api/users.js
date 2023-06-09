import axios from 'axios'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {action, ...body} = req.body
        let response
        switch(action){
            case 'login': 
                response = await axios.post(`${process.env.SERVER_URL}/auth/login`, body);
                break;
            default: 
                response = null;
        }
        res.status(response.status).send(response.data)
    }
}

export default handler;