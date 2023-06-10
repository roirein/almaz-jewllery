import axios from 'axios'; 
import formidable from 'formidable'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        

        const formData = new FormData();
        formData.append('model', req.body.model);
        try {
            const response = await axios.post(`${process.env.SERVER_URL}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': req.header('Authorization')
                }
            })
            console.log(response.data)
        
        } catch(e) {
            console.log('error')
        }
    
        //const response = await axios.post(`${process.env.SERVER_URL}/image/upload`, req.bod)
        res.status(200).send()
    }
}

export default handler;